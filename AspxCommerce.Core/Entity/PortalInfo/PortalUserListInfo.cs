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
using System;
using System.Runtime.Serialization;

namespace AspxCommerce.Core
{
    [DataContract]
    [Serializable]
    public class PortalUserRoleListInfo
    {
        public PortalUserRoleListInfo()
        {
        }

        private Guid  _roleID;
        private string _loweredRoleName;

        private string _userName;
      
        private string _email;

        public Guid RoleID
        {
            get
            {
                return this._roleID;
            }
            set
            {
                if ((this._roleID != value))
                {
                    this._roleID = value;
                }
            }
        }

        public string UserName
        {
            get
            {
                return this._userName;
            }
            set
            {
                if ((this._userName != value))
                {
                    this._userName = value;
                }
            }
        }

        public string LoweredRoleName
        {
            get
            {
                return this._loweredRoleName;
            }
            set
            {
                if ((this._loweredRoleName != value))
                {
                    this._loweredRoleName = value;
                }
            }
        }

        public string Email
        {
            get
            {
                return this._email;
            }
            set
            {
                if ((this._email != value))
                {
                    this._email = value;
                }
            }
        }
    }
    
}
