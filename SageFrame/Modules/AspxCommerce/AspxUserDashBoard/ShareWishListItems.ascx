﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ShareWishListItems.ascx.cs" Inherits="Modules_AspxCommerce_AspxUserDashBoard_ShareWishListItems" %>
<script type="text/javascript">
    //<![CDATA[
    var shareWihsListItems = '';
    $(function() {

        $(".sfLocale").localize({
            moduleKey: AspxUserDashBoard
        });

        shareWihsListItems = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
                method: "",
                url: "",
                ajaxCallMode: "",
                error: ""
            },

            ajaxCall: function(config) {
                $.ajax({
                    type: shareWihsListItems.config.type,
                    contentType: shareWihsListItems.config.contentType,
                    cache: shareWihsListItems.config.cache,
                    async: shareWihsListItems.config.async,
                    url: shareWihsListItems.config.url,
                    data: shareWihsListItems.config.data,
                    dataType: shareWihsListItems.config.dataType,
                    success: shareWihsListItems.config.ajaxCallMode,
                    error: shareWihsListItems.config.error
                });
            },

            HideAllDiv: function() {
                $('#divShareWishListItemDetails').hide();
                $('#divViewShareWihsList').hide();
                $('.cssClassShareWishItemID').hide();
            },

            BindShareWihsListItemMail: function() {
                var offset_ = 1;
                var current_ = 1;
                this.config.url = this.config.baseURL;
                this.config.method = "GetAllShareWishListItemMail";
                var perpage = ($("#gdvShareWishListtbl_pagesize").length > 0) ? $("#gdvShareWishListtbl_pagesize :selected").text() : 10;
                aspxCommonObj.UserName = userFullName;
                $("#gdvShareWishListtbl").sagegrid({
                    url: this.config.url,
                    functionMethod: this.config.method,
                    colModel: [
                        { display: 'ShareWishID', name: 'ShareWishID', cssclass: 'cssClassHeadCheckBox', coltype: 'checkbox', align: 'center', elemClass: 'EmailsChkbox', elemDefault: false, controlclass: 'itemsHeaderChkbox' },
                        { display: 'SharedWishItemID', name: 'SharedItemIDs', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'center', hide: true },
                        { display: 'Shared WishItem Name', name: 'SharedWishItemName', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                        { display: 'ItemSku', name: 'ItemSku', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                        { display: 'Sender Name', name: 'SenderName', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                        { display: 'Sender Email', name: 'SenderEmail', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                        { display: getLocale(AspxUserDashBoard, 'Receivers Email ID'), name: 'ReceiverEmailID', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                        { display: getLocale(AspxUserDashBoard, 'Subject'), name: 'Subject', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                        { display: 'Message', name: 'massage', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: true },
                        { display: getLocale(AspxUserDashBoard, 'Shared On'), name: 'AddedOn', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left' },
                        { display: getLocale(AspxUserDashBoard, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                    ],
                    buttons: [
                        { display: getLocale(AspxUserDashBoard, 'View'), name: 'view', enable: true, _event: 'click', trigger: '1', callMethod: 'shareWihsListItems.ViewShareWishListEmail', arguments: '1,2,3,4,5,6,7,8,9' },
                        { display: getLocale(AspxUserDashBoard, 'Delete'), name: 'delete', enable: true, _event: 'click', trigger: '2', callMethod: 'shareWihsListItems.DeleteShareWishListEmail', arguments: '' }
                    ],
                    rp: perpage,
                    nomsg: getLocale(AspxUserDashBoard, "No Records Found!"),
                    param: { aspxCommonObj: aspxCommonObj },
                    current: current_,
                    pnew: offset_,
                    sortcol: { 0: { sorter: false }, 10: { sorter: false} }
                });
            },

            ViewShareWishListEmail: function(tblID, argus) {
                switch (tblID) {
                    case 'gdvShareWishListtbl':
                        shareWihsListItems.GetWishLisDetailByID(argus[0]);
                        $('#divShareWishListItemDetails').hide();
                        $('#divViewShareWihsList').show();
                        $('#lblWishListSharedDateD').html(argus[11]);
                        $('#lblSenderNameD').html(argus[6]);
                        $('#lblSenderEmailIDD').html(argus[7]);
                        $('#lblShareWishlListSubjectD').html(argus[9]);
                        if (argus[10] != '')
                            $('#lblShareWishListMessageD').html(argus[10]);
                        else {
                            $('#lblShareWishListMessageD').html(getLocale(AspxUserDashBoard, "N/A"));
                        }
                        $('#hdnShareWishItemID').val(argus[0]);

                        var receiverEmailID = argus[8];
                        var substrEmailID = receiverEmailID.split(',');
                        var IDs = '';
                        $.each(substrEmailID, function(index, value) {
                            IDs += value + '</br>';
                        });
                        $('#lblReceiverEmailIDD').html(IDs);
                        break;
                    default:
                        break;
                }
            },

            GetWishLisDetailByID: function(shareWishedID) {
                this.config.url = this.config.baseURL + "GetShareWishListItemByID";
                this.config.data = JSON2.stringify({ sharedWishID: shareWishedID, aspxCommonObj: aspxCommonObj });
                this.config.ajaxCallMode = shareWihsListItems.BindShareWishListItem;
                this.ajaxCall(this.config);
            },

            DeleteShareWishListEmail: function(tblID, argus) {
                switch (tblID) {
                    case 'gdvShareWishListtbl':
                        var properties = {
                            onComplete: function(e) {
                                shareWihsListItems.DeleteMultipleShareWishListEmail(argus[0], e);
                            }
                        };
                        csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, "Delete Confirmation") + "</h2><p>" + getLocale(AspxUserDashBoard, "Are you sure you want to delete this wish item list?") + "</p>", properties);
                        break;
                    default:
                        break;
                }
            },

            DeleteShareWish: function() {
                var id = $('#hdnShareWishItemID').val();
                var properties = {
                    onComplete: function(e) {
                        shareWihsListItems.DeleteMultipleShareWishListEmail(id, e);
                    }
                }
                csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, "Delete Confirmation") + "</h2><p>" + getLocale(AspxUserDashBoard, "Do you want to delete?") + "</p>", properties);
            },

            ConfirmDeleteMultipleShareWishList: function(Ids, event) {
                shareWihsListItems.DeleteMultipleShareWishListEmail(Ids, event);
            },

            DeleteMultipleShareWishListEmail: function(emailShareWish_Ids, event) {
                if (event) {
                    this.config.url = this.config.baseURL + "DeleteShareWishListItem";
                    this.config.data = JSON2.stringify({ shareWishListID: emailShareWish_Ids, aspxCommonObj: aspxCommonObj });
                    this.config.ajaxCallMode = shareWihsListItems.BindShareWishItemOnDelete;
                    this.config.error = shareWihsListItems.GetDeleteShareWishItemMsg;
                    this.ajaxCall(this.config);
                }
                return false;
            },

            BindShareWishListItem: function(msg) {
                var Name = '';
                $.each(msg.d, function(index, value) {
                    var itemName = value.SharedWishItemName;
                    var substr = itemName.split(',');
                    Name += '<li><a href="' + aspxRedirectPath + 'item/' + value.ItemSku + pageExtension + '">' + value.SharedWishItemName + '</a></li>';
                    //                            var Name = '';
                    //                            $.each(substr, function(index, value) {
                    //                                Name += value + '</br>';
                    //                            });
                    //                            $('#lblShareWishItemNameD').html(Name);
                });
                $('#lblShareWishItemNameD').html(Name);
            },

            BindShareWishItemOnDelete: function() {
                csscody.info("<h2>" + getLocale(AspxUserDashBoard, "Successful Message") + "</h2><p>" + getLocale(AspxUserDashBoard, "Your wish item has been deleted successfully.") + "</p>");
                shareWihsListItems.BindShareWihsListItemMail();
                $('#divViewShareWihsList').hide();
                $('#divShareWishListItemDetails').show();
            },


            GetDeleteShareWishItemMsg: function() {
                csscody.error("<h2>" + getLocale(AspxUserDashBoard, "Error Message") + "</h2><p>" + getLocale(AspxUserDashBoard, "Failed to delete!") + "</p>");
            },

            init: function(config) {
                shareWihsListItems.HideAllDiv();
                $('#divShareWishListItemDetails').show();
                shareWihsListItems.BindShareWihsListItemMail();
                $('#btnDeleteSelected').bind("click", function() {
                    var shareWishListIDs = '';
                    //Get the multiple Ids of the item selected
                    $(".EmailsChkbox").each(function(i) {
                        if ($(this).attr("checked")) {
                            shareWishListIDs += $(this).val() + ',';
                        }
                    });
                    if (shareWishListIDs != "") {
                        var properties = {
                            onComplete: function(e) {
                                shareWihsListItems.ConfirmDeleteMultipleShareWishList(shareWishListIDs, e);
                            }
                        }
                        csscody.confirm("<h2>" + getLocale(AspxUserDashBoard, "Delete Confirmation") + "</h2><p>" + getLocale(AspxUserDashBoard, "Are you sure you want to delete this selected wish item list?") + "</p>", properties);
                    } else {
                        csscody.alert("<h2>" + getLocale(AspxUserDashBoard, "Information Alert") + "</h2><p>" + getLocale(AspxUserDashBoard, "Please select at least one wish item list.") + "</p>");
                    }
                });
                $("#btnDelete").bind("click", function() {
                    shareWihsListItems.DeleteShareWish();
                });
                $('#btnShareWishBack').bind("click", function() {
                    $('#divShareWishListItemDetails').show();
                    $('#divViewShareWihsList').hide();
                });
            }
        };
        shareWihsListItems.init();
    });
    //]]>
</script>

<div id="divShareWishListItemDetails">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <label id="lblShareWishTitle" class="sfLocale">My Share Wish List Item</label>
            </h2>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteSelected">
                            <span><span class="sfLocale">Delete All Selected</span> </span>
                        </button>
                    </p>
                    <div class="cssClassClear">
                    </div>
                </div>
            </div>
            <div class="cssClassClear">
            </div>
        </div>
        <div class="sfGridwrapper">
            <div class="sfGridWrapperContent">
                <div class="loading">
                    <img id="ajaxUserDashShareWishImage" src="" class="sfLocale" alt="loading...." />
                </div>
                <div class="log">
                </div>
                <table  class="sfGridWrapperTable sfLocale" id="gdvShareWishListtbl" cellspacing="0" cellpadding="0" border="0" width="100%">
                </table>
            </div>
        </div>
    </div>
</div>

<div id="divViewShareWihsList" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <label id="lblSPHeading" class="sfLocale">Share WishList</label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="cssClassPadding">
              <tr>
                    <td>
                        <label id="lblWishListSharedDate" class="cssClassLabel sfLocale">WishList Shared Date :</label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <label id="lblWishListSharedDateD"></label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblSenderName" class="cssClassLabel sfLocale">Sender Name: </label>
                    </td>
                    <td class="cssClassTableRightCol">
                       <label id="lblSenderNameD" ></label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblSenderEmailID" class="cssClassLabel sfLocale">Sender Email ID:</label>
                    </td>
                    <td class="cssClassTableRightCol">
                       <label id="lblSenderEmailIDD" ></label>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <label id="lblReceiverEmailID" class="cssClassLabel sfLocale">Receiver Email ID :</label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <label id="lblReceiverEmailIDD"></label>
                    </td>
                </tr>
             
                <tr class="cssClassShareWishItemID">
                    <td>
                        <label id="lblShareWishListItemID" class="cssClassLabel sfLocale">Shared Wish Item ID :</label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <label id="lblShareWishListItemIDD" ></label>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <label id="lblShareWishListItemName" class="cssClassLabel sfLocale">Shared Wish Item Name: </label>
                    </td>
                    <td class="cssClassTableRightCol">
                       <ul id="lblShareWishItemNameD"></ul>
                    </td>
                </tr>
               
                  <tr>
                    <td>
                        <label id="lblShareWishlListSubject" class="cssClassLabel sfLocale">Mail's Subject :</label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <label id="lblShareWishlListSubjectD" ></label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblShareWishListMessage" class="cssClassLabel sfLocale">Mail's Message :</label>
                    </td>
                    <td class="cssClassTableRightCol">
                        <label id="lblShareWishListMessageD"></label>
                    </td>
                </tr>
                            
            </table>
        </div>
        <div class="sfButtonwrapper">
            <button type="button" id="btnShareWishBack">
                <span><span class="sfLocale">Back</span></span></button>
            <button type="reset" id="btnDelete" >
                <span><span class="sfLocale">Delete</span></span></button>
        </div>
        <div class="cssClassClear">
        </div>
    </div>
</div>
<input type="hidden" id="hdnShareWishItemID" />