﻿var ItemReviews = "";

$(function() {
    var reviewedItemID = '';
    var aspxCommonObj = {
        StoreID: AspxCommerce.utils.GetStoreID(),
        PortalID: AspxCommerce.utils.GetPortalID(),
        UserName: AspxCommerce.utils.GetUserName(),
        CultureName: AspxCommerce.utils.GetCultureName()
    };
    ItemReviews = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: "json",
            baseURL: aspxservicePath + "AspxCommerceWebService.asmx/",
            url: "",
            method: ""
        },
        init: function() {
            ItemReviews.LoadItemReviewStaticImage();
            ItemReviews.BindItemReviews();
            ItemReviews.GetStatusList();
            ItemReviews.HideDiv();
            $("#divItemReviews").show();
            $("#btnBack").click(function() {
                ItemReviews.HideDiv();
                $("#divItemReviews").show();
            });
            $("#btnReviewBack").click(function() {
                ItemReviews.HideDiv();
                $("#divShowItemReview").show();
            });
        },
        ajaxCall: function(config) {
            $.ajax({
                type: ItemReviews.config.type,
                contentType: ItemReviews.config.contentType,
                cache: ItemReviews.config.cache,
                async: ItemReviews.config.async,
                data: ItemReviews.config.data,
                dataType: ItemReviews.config.dataType,
                url: ItemReviews.config.url,
                success: ItemReviews.ajaxSuccess,
                error: ItemReviews.ajaxFailure
            });
        },
        LoadItemReviewStaticImage: function() {
            $('#ajaxItemReviewImage').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
            $('#ajaxItemReviewImage2').attr('src', '' + aspxTemplateFolderPath + '/images/ajax-loader.gif');
        },

        HideDiv: function() {
            $("#divItemReviews").hide();
            $("#divShowItemReview").hide();
            $("#divItemReviewRatingForm").hide();
        },
        GetItemReviewsDataForExport: function() {
            this.config.url = this.config.baseURL + "GetItemReviews";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 4;
            this.ajaxCall(this.config);
        },
        BindItemReviesExportData: function(data) {
            var exportData = '<thead><tr><th>' + getLocale(AspxItemRatingManagement, 'Item Name') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Number Of Reviews') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Average Rating') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Last Review') + '</th></tr></thead><tbody>';
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    exportData += '<tr><td>' + value.ItemName + '</td><td>' + value.NumberOfReviews + '</td>';
                    exportData += '<td>' + value.TotalRatingAverage + '</td><td>' + value.LastReview + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>' + getLocale(AspxItemRatingManagement, 'No Records Found!') + '</td></tr>';
            }
            exportData += '</tbody>';

            $('#ItemReviewsExportDataTbl').html(exportData);
            $("input[id$='HdnValue']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvItemReviewHdn']").val($("#ItemReviewsExportDataTbl").table2CSV());
            $("#ItemReviewsExportDataTbl").html('');
        },
        BindItemReviews: function() {
            this.config.method = "GetItemReviews";
            this.config.data = { aspxCommonObj: aspxCommonObj };
            var data = this.config.data;
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvItemReviews_pagesize").length > 0) ? $("#gdvItemReviews_pagesize :selected").text() : 10;

            $("#gdvItemReviews").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: 'ItemID', name: 'itemId', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Item Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Number Of Reviews'), name: 'number_of_reviews', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Average Rating'), name: 'average', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Last Review'), name: 'last_review', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left', format: 'yyyy/MM/dd' },
                    { display: getLocale(AspxItemRatingManagement, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],

                buttons: [
                    { display: getLocale(AspxItemRatingManagement, 'View'), name: 'showReviews', enable: true, _event: 'click', trigger: '1', callMethod: 'ItemReviews.ShowItemReviewsList', arguments: '1,2' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxItemRatingManagement, "No Records Found!"),
                param: data, // { storeID: storeId, portalID: portalId },
                current: current_,
                pnew: offset_,
                sortcol: { 5: { sorter: false} }
            });
        },
        ExportItemReviewToCsvData: function() {
            ItemReviews.GetItemReviewsDataForExport();
        },
        ExportDivDataToExcel: function() {
            ItemReviews.GetItemReviewsDataForExport();
        },
        ShowItemReviewsList: function(tblID, argus) {
            switch (tblID) {
                case "gdvItemReviews":
                    $("#" + lbIRHeading).html(getLocale(AspxItemRatingManagement, "All Reviews for") + " " + argus[3]);
                    reviewedItemID = argus[0];
                    ItemReviews.BindShowItemReviewsList(argus[0], null, null, null);
                    ItemReviews.HideDiv();
                    $("#divShowItemReview").show();
                    break;
            }
        },
        GetItemReviewDetailListForExport: function() {
            var itemReviewObj = {
                ItemID: reviewedItemID,
                UserName: null,
                Status: null,
                ItemName: null
            };
            this.config.url = this.config.baseURL + "GetAllItemReviewsList";
            this.config.data = JSON2.stringify({ offset: 1, limit: null, itemReviewObj: itemReviewObj, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 5;
            this.ajaxCall(this.config);
        },
        BindShowItemReviewsListExportData: function(data) {
            var exportData = '<thead><tr><th>' + getLocale(AspxItemRatingManagement, 'Nick Name') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Total Rating Average') + '</th><th>' + getLocale(AspxItemRatingManagement, 'View From IP') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Review Summary') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Status') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Item Name') + '</th><th>' + getLocale(AspxItemRatingManagement, 'Added On') + '</th></tr></thead><tbody>';
            if (data.d.length > 0) {
                $.each(data.d, function(index, value) {
                    exportData += '<tr><td>' + value.Username + '</td><td>' + value.TotalRatingAverage + '</td>';
                    exportData += '<td>' + value.ViewFromIP + '</td><td>' + value.ReviewSummary + '</td>';
                    exportData += '<td>' + value.Status + '</td><td>' + value.ItemName + '</td>';
                    exportData += '</td><td>' + value.AddedOn + '</td></tr>';
                });
            } else {
                exportData += '<tr><td>' + getLocale(AspxItemRatingManagement, 'No Records Found!') + '</td></tr>';
            }
            exportData += '</tbody>';
            $('#ShowItemReviewExportDataTbl').html(exportData);
            $("input[id$='HdnReviews']").val('<table>' + exportData + '</table>');
            $("input[id$='_csvCustomerReviewDetailValue']").val($("#ShowItemReviewExportDataTbl").table2CSV());
            $("#ShowItemReviewExportDataTbl").html('');
        },
        BindShowItemReviewsList: function(itemId, searchUserName, status, SearchItemName) {
            var itemReviewObj = {
                ItemID: itemId,
                UserName: searchUserName,
                Status: status,
                ItemName: SearchItemName
            };
            this.config.method = "GetAllItemReviewsList";
            this.config.data = { itemReviewObj: itemReviewObj, aspxCommonObj: aspxCommonObj };
            var data = this.config.data;
            $("#hdnItemID").val(itemId);
            var offset_ = 1;
            var current_ = 1;
            var perpage = ($("#gdvShowItemReviewList_pagesize").length > 0) ? $("#gdvShowItemReviewList_pagesize :selected").text() : 10;

            $("#gdvShowItemReviewList").sagegrid({
                url: this.config.baseURL,
                functionMethod: this.config.method,
                colModel: [
                    { display: 'ItemReviewID', name: 'itemreview_id', cssclass: 'cssClassHide', align: 'center', elemClass: 'customerReviewChkbox', hide: true },
                    { display: 'Item ID', name: 'item_id', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Nick Name'), name: 'user_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: false },
                    { display: getLocale(AspxItemRatingManagement, 'Total Rating Average'), name: 'total_rating_average', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: false },
                    { display: getLocale(AspxItemRatingManagement, 'View From IP'), name: 'view_from_IP', cssclass: '', controlclass: '', coltype: 'label', align: 'left', hide: false },
                    { display: getLocale(AspxItemRatingManagement, 'Review Summary'), name: 'review_summary', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Review'), name: 'review', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Status'), name: 'status', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Item Name'), name: 'item_name', cssclass: '', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Added On'), name: 'AddedOn', cssclass: 'cssClassHeadDate', controlclass: '', coltype: 'label', align: 'left' },
                    { display: getLocale(AspxItemRatingManagement, 'Added By'), name: 'AddedBy', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Status ID'), name: 'status_id', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Item SKU'), name: 'item_SKU', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'left', hide: true },
                    { display: getLocale(AspxItemRatingManagement, 'Actions'), name: 'action', cssclass: 'cssClassAction', coltype: 'label', align: 'center' }
                ],
                buttons: [
                    { display: getLocale(AspxItemRatingManagement, 'View'), name: 'view', enable: true, _event: 'click', trigger: '1', callMethod: 'ItemReviews.ViewUserReviewsAndRatings', arguments: '1,2,3,4,5,6,7,8,9,10,11,12' }
                ],
                rp: perpage,
                nomsg: getLocale(AspxItemRatingManagement, "No Records Found!"),
                param: data, // { user: searchUserName, statusName: status, itemName: SearchItemName, storeID: storeId, portalID: portalId, cultureName: cultureName, userName: UserName },
                current: current_,
                pnew: offset_,
                sortcol: { 0: { sorter: false }, 1: { sorter: false }, 13: { sorter: false} }
            });
        },

        ViewUserReviewsAndRatings: function(tblID, argus) {
            switch (tblID) {
                case "gdvShowItemReviewList":
                    //alert(argus[0]);
                    ItemReviews.BindItemReviewDetails(argus);
                    ItemReviews.BindRatingCriteria(argus[0]);
                    ItemReviews.BindRatingSummary(argus[0]);
                    itemReviewID = argus[0];
                    ItemReviews.HideDiv();
                    $("#divItemReviewRatingForm").show();
                    $("#hdnItemReviewId").val(argus[0]);
                    break;
                default:
                    break;
            }
        },
        BindRatingCriteria: function(reviewID) {
            this.config.url = this.config.baseURL + "GetItemRatingCriteriaByReviewID";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj, itemReviewID: reviewID, isFlag: false });
            this.config.ajaxCallMode = 1;
            this.ajaxCall(this.config);
        },
        RatingCriteria: function(item) {
            var ratingCriteria = '';
            ratingCriteria += '<tr><td class="cssClassRatingTitleName"><label class="cssClassLabel">' + item.ItemRatingCriteria + ':</label></td><td>';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="1" title="Worst" validate="required:true" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="2" title="Bad" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="3" title="OK" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="4" title="Good" />';
            ratingCriteria += '<input name="star' + item.ItemRatingCriteriaID + '" type="radio" class="auto-submit-star item-rating-crieteria' + item.ItemRatingCriteriaID + '" value="5" title="Best" />';
            ratingCriteria += '<span id="hover-test' + item.ItemRatingCriteriaID + '"></span>';
            ratingCriteria += '<label for="star' + item.ItemRatingCriteriaID + '" class="error">Please rate for ' + item.ItemRatingCriteria + '</label></tr></td>';
            $("#tblRatingCriteria").append(ratingCriteria);
        },
        GetStatusList: function() {
            this.config.url = this.config.baseURL + "GetStatus";
            this.config.data = JSON2.stringify({ aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 2;
            this.ajaxCall(this.config);
        },
        BindItemReviewDetails: function(argus) {
            $("#" + lblReviewsFromHeading).html(getLocale(AspxItemRatingManagement, "Review:") + " " + argus[7]);
            $("#lnkItemName").html(argus[10]);
            $("#lnkItemName").attr("name", argus[3]);
            $("#lblPostedBy").html(argus[12]);
            $("#lblViewFromIP").html(argus[6]);
            $("#txtNickName").val(argus[4]);
            $("#lblAddedOn").html(argus[11]);
            $("#txtSummaryReview").val(argus[7]);
            $("#txtReview").val(argus[8]);
            $("#selectStatus").val(argus[13]);

            $("#txtNickName").attr('disabled', 'disabled');
            $("#txtSummaryReview").attr('disabled', 'disabled');
            $("#txtReview").attr('disabled', 'disabled');
            $("#selectStatus").attr('disabled', 'disabled');
        },
        BindRatingSummary: function(review_id) {
            this.config.url = this.config.baseURL + "GetItemRatingByReviewID";
            this.config.data = JSON2.stringify({ itemReviewID: review_id, aspxCommonObj: aspxCommonObj });
            this.config.ajaxCallMode = 3;
            this.ajaxCall(this.config);
        },
        BindStarRatingsDetails: function() {
            $.metadata.setType("attr", "validate");
            $('.auto-submit-star').rating({
                required: true,
                focus: function(value, link) {
                    var ratingCriteria_id = $(this).attr("name").replace(/[^0-9]/gi, '');
                    var tip = $('#hover-test' + ratingCriteria_id);
                    tip[0].data = tip[0].data || tip.html();
                    tip.html(link.title || 'value: ' + value);
                    $("#tblRatingCriteria label.error").hide();
                },
                blur: function(value, link) {
                    var ratingCriteria_id = $(this).attr("name").replace(/[^0-9]/gi, '');
                    var tip = $('#hover-test' + ratingCriteria_id);
                    tip.html(tip[0].data || '');
                    $("#tblRatingCriteria label.error").hide();
                },

                callback: function(value, event) {
                    var ratingValues = '';
                    var ratingCriteria_id = $(this).attr("name").replace(/[^0-9]/gi, '');
                    var starRatingValues = $(this).attr("value");
                    var len = ratingCriteria_id.length;
                    var isAppend = true;
                    if (ratingValues != '') {
                        var stringSplit = ratingValues.split('#');
                        $.each(stringSplit, function(index, item) {
                            if (item.substring(0, item.indexOf('-')) == ratingCriteria_id) {
                                var index = ratingValues.indexOf(ratingCriteria_id + "-");
                                var toReplace = ratingValues.substr(index, 2 + len);
                                ratingValues = ratingValues.replace(toReplace, ratingCriteria_id + "-" + value);
                                isAppend = false;
                            }
                        });
                        if (isAppend) {
                            ratingValues += ratingCriteria_id + "-" + starRatingValues + "#" + '';
                        }
                    } else {
                        ratingValues += ratingCriteria_id + "-" + starRatingValues + "#" + '';
                    }
                }
            });
        },
        BindStarRatingAverage: function(itemAvgRating) {
            $("#divAverageRating").html('');
            var ratingStars = '';
            var ratingTitle = ["Worst", "Ugly", "Bad", "Not Bad", "Average", "OK", "Nice", "Good", "Best", "Excellent"]; //To do here tooltip for each half star
            var ratingText = ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"];
            var i = 0;
            ratingStars += '<div class="cssClassToolTip">';
            for (i = 0; i < 10; i++) {
                if (itemAvgRating == ratingText[i]) {
                    ratingStars += '<input name="avgItemRating" type="radio" class="auto-star-avg {split:2}" disabled="disabled" checked="checked" value="' + ratingTitle[i] + '" />';
                    $(".cssClassRatingTitle").html(ratingTitle[i]);
                } else {
                    ratingStars += '<input name="avgItemRating" type="radio" class="auto-star-avg {split:2}" disabled="disabled" value="' + ratingTitle[i] + '" />';
                }
            }
            ratingStars += '</div>';
            $("#divAverageRating").append(ratingStars);
        },
        ExportItemReviewDetailToCsvData: function() {
            ItemReviews.GetItemReviewDetailListForExport();
        },
        ExportItemReviewDataToExcel: function() {
            ItemReviews.GetItemReviewDetailListForExport();
        },
        SearchItemRatings: function() {
            var itemID = $("#hdnItemID").val();
            var searchUserName = $.trim($("#txtSearchUserName").val());
            var status = '';
            if (searchUserName.length < 1) {
                searchUserName = null;
            }
            if ($.trim($("#ddlStatus").val()) != 0) {
                status = $("#ddlStatus option:selected").text();
            } else {
                status = null;
            }
            var SearchItemName = $.trim($("#txtsearchItemName").val());
            if (SearchItemName.length < 1) {
                SearchItemName = null;
            }
            ItemReviews.BindShowItemReviewsList(itemID, searchUserName, status, SearchItemName);
        },
        ajaxSuccess: function(data) {
            switch (ItemReviews.config.ajaxCallMode) {
                case 0:
                    break;
                case 1:
                    $("#tblRatingCriteria").html('');
                    if (data.d.length > 0) {
                        $.each(data.d, function(index, item) {
                            ItemReviews.RatingCriteria(item);
                        });
                    } else {
                        csscody.alert("<h2>" + getLocale(AspxItemRatingManagement, 'Information Alert') + '</h2><p>' + getLocale(AspxItemRatingManagement, 'Sorry! no rating criteria found.') + "</p>");
                    }
                    break;
                case 2:
                    $.each(data.d, function(index, item) {
                        $("#selectStatus").append("<option value=" + item.StatusID + ">" + item.Status + "</option>");
                        $("#ddlStatus").append("<option value=" + item.StatusID + ">" + item.Status + "</option>");
                    });
                    $('#selectStatus').val('2');
                    break;
                case 3:
                    $("#tblRatingCriteria label.error").hide();
                    var itemAvgRating = '';
                    $.each(data.d, function(index, item) {
                        if (index == 0) {
                            ItemReviews.BindStarRatingsDetails();
                            ItemReviews.BindStarRatingAverage(item.RatingAverage);
                            itemRatingAverage = item.RatingAverage;
                        }
                        itemAvgRating = JSON2.stringify(item.RatingValue);
                        $('input.item-rating-crieteria' + item.ItemRatingCriteriaID).rating('select', itemAvgRating);
                        $('input.item-rating-crieteria' + item.ItemRatingCriteriaID).rating('disable');
                    });
                    $.metadata.setType("class");
                    $('input.auto-star-avg').rating();
                    break;
                case 4:
                    ItemReviews.BindItemReviesExportData(data);
                    break;
                case 5:
                    ItemReviews.BindShowItemReviewsListExportData(data);
                    break;
            }
        }
    };
    ItemReviews.init();
});