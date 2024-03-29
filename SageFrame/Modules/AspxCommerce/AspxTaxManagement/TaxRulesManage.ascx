﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TaxRulesManage.ascx.cs"
    Inherits="Modules_AspxTaxManagement_TaxRulesManage" %>

<script type="text/javascript">
    $(function() {
        $(".sfLocale").localize({
            moduleKey: AspxTaxManagement
        });
    });
 //<![CDATA[
    var lblTaxRuleHeading='<%=lblTaxRuleHeading.ClientID %>';
    //]]>
</script>

<div id="divTaxManageRulesGrid">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h1>
                <asp:Label ID="lblTitle" runat="server" Text="Manage Tax Rules" 
                    meta:resourcekey="lblTitleResource1"></asp:Label>
            </h1>
            <div class="cssClassHeaderRight">
                <div class="sfButtonwrapper">
                    <p>
                        <button type="button" id="btnDeleteSelected">
                            <span><span  class="sfLocale"> Delete All Selected</span> </span>
                        </button>
                    </p>
                    <p>
                        <button type="button" id="btnAddNewTaxRule">
                            <span><span class="sfLocale">Add New Tax Rule</span> </span>
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
                <div class="cssClassSearchPanel sfFormwrapper">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Tax Rule Name:</label>
                                <input type="text" id="txtRuleName" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Customer Role:</label>
                                <select id="ddlCustomerRoleName" class="sfListmenu">
                                    <option value="0" class="sfLocale">--All--</option>
                                </select>
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Item Tax Class Name:</label>
                                <select id="ddlItemClassName" class="sfListmenu">
                                    <option value="0">--All--</option>
                                </select>
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Tax Rate Name:</label>
                                <select id="ddlTaxRateTitle" class="sfListmenu">
                                    <option value="0" class="sfLocale">--All--</option>
                                </select>
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Priority:</label>
                                <input type="text" id="txtSearchPriority" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <label class="cssClassLabel sfLocale">
                                    Display Order:</label>
                                <input type="text" id="txtSearchDisplayOrder" class="sfTextBoxSmall" />
                            </td>
                            <td>
                                <div class="sfButtonwrapper cssClassPaddingNone">
                                    <p>
                                        <button type="button" onclick="TaxRules.SearchTaxManageRules()">
                                            <span><span class="sfLocale">Search</span></span></button>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="loading">
                    <img id="ajaxTaxRuleMgmtImage" src=""  alt="loading...." />
                </div>
                <div class="log">
                </div>
                <table id="gdvTaxRulesDetails" width="100%" border="0" cellpadding="0" cellspacing="0">
                </table>
            </div>
        </div>
    </div>
</div>
<div id="divTaxRuleInformation" style="display:none">
    <div class="cssClassCommonBox Curve">
        <div class="cssClassHeader">
            <h2>
                <asp:Label ID="lblTaxRuleHeading" runat="server" Text="Tax Rule Information:" 
                    meta:resourcekey="lblTaxRuleHeadingResource1"></asp:Label>
            </h2>
        </div>
        <div class="sfFormwrapper">
            <table cellspacing="0" cellpadding="0" border="0"  class="cssClassPadding tdpadding">
                <tr>
                    <td>
                        <asp:Label ID="lblTaxManageRuleName" runat="server" Text="Tax Manage Rule Name:"
                            CssClass="cssClassLabel" meta:resourcekey="lblTaxManageRuleNameResource1"></asp:Label>
                       
                    </td>
                    <td class="cssClassTableRightCol">
                        <input type="text" id="txtTaxManageRuleName" name="ruleName" class="sfInputbox required" /> <span class="cssClassRequired">*</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblCustomerTaxClass" runat="server" Text="Customer Role:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblCustomerTaxClassResource1"></asp:Label>
                    </td>
                    <td>
                        <select id="ddlCustomerRoleClass" class="sfListmenu required" multiple="multiple">
                        <option value="0" class="sfLocale">--Select One--</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblItemTaxClass" runat="server" Text="Item Tax Class:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblItemTaxClassResource1"></asp:Label>
                    </td>
                    <td>
                        <select id="ddlItemTaxClass" class="sfListmenu required">
                        <option value="0" class="sfLocale">--Select One--</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblTaxRate" runat="server" Text="Tax Rate:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblTaxRateResource1"></asp:Label>
                    </td>
                    <td>
                        <select id="ddlTaxRate" class="sfListmenu required">
                        <option value="0" class="sfLocale">--Select One--</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblPriority" runat="server" Text="Priority:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblPriorityResource1"></asp:Label>
                     
                    </td>
                    <td>
                        <input type="text" id="txtPriority" name="priority" class="sfInputbox priority required" />
                        <span id="errmsgPriority"></span>   <span class="cssClassRequired">*</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblDisplayOrder" runat="server" Text="Display Order:" 
                            CssClass="cssClassLabel" meta:resourcekey="lblDisplayOrderResource1"></asp:Label>
                       
                    </td>
                    <td>
                        <input type="text" id="txtDisplayOrder" name="displayOrder" class="sfInputbox displayOrder required" />
                        <span id="errmsgDisplayOrder"></span><span id="errDisplayOrder"></span> <span class="cssClassRequired">*</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="sfButtonwrapper">
            <p>
                <button type="button" id="btnCancel">
                    <span><span class="sfLocale" >Cancel</span> </span>
                </button>
            </p>
            <p>
                <button type="button" id="btnSaveTaxRule">
                    <span><span class="sfLocale">Save</span> </span>
                </button>
            </p>
        </div>
    </div>
</div>
<input type="hidden" id="hdnTaxManageRuleID" />
