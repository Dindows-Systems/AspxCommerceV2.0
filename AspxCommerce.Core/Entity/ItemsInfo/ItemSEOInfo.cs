﻿/*
AspxCommerce® - http://www.aspxcommerce.com
Copyright (c) 20011-2012 by AspxCommerce
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

namespace AspxCommerce.Core
{

    public class ItemSEOInfo
    {
        public ItemSEOInfo()
        {
        }

        private int _itemID;

        private string _sku;

        private string _name;

        private string _metaTitle;

        private string _metaKeywords;

        private string _metaDescription;

        public int ItemID
        {
            get
            {
                return this._itemID;
            }
            set
            {
                if ((this._itemID != value))
                {
                    this._itemID = value;
                }
            }
        }

        public string SKU
        {
            get
            {
                return this._sku;
            }
            set
            {
                if ((this._sku != value))
                {
                    this._sku = value;
                }
            }
        }

        public string Name
        {
            get
            {
                return this._name;
            }
            set
            {
                if ((this._name != value))
                {
                    this._name = value;
                }
            }
        }

        public string MetaTitle
        {
            get
            {
                return this._metaTitle;
            }
            set
            {
                if ((this._metaTitle != value))
                {
                    this._metaTitle = value;
                }
            }
        }

        public string MetaKeywords
        {
            get
            {
                return this._metaKeywords;
            }
            set
            {
                if ((this._metaKeywords != value))
                {
                    this._metaKeywords = value;
                }
            }
        }

        public string MetaDescription
        {
            get
            {
                return this._metaDescription;
            }
            set
            {
                if ((this._metaDescription != value))
                {
                    this._metaDescription = value;
                }
            }
        }
    }
}
