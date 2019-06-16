using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
namespace Temp
{
    #region Login
    public class Login
    {
        #region Member Variables
        protected int _id;
        protected string _account;
        protected string _name;
        protected string _password;
        protected int _do;
        #endregion
        #region Constructors
        public Login() { }
        public Login(string account, string name, string password, int do)
        {
            this._account=account;
            this._name=name;
            this._password=password;
            this._do=do;
        }
        #endregion
        #region Public Properties
        public virtual int Id
        {
            get {return _id;}
            set {_id=value;}
        }
        public virtual string Account
        {
            get {return _account;}
            set {_account=value;}
        }
        public virtual string Name
        {
            get {return _name;}
            set {_name=value;}
        }
        public virtual string Password
        {
            get {return _password;}
            set {_password=value;}
        }
        public virtual int Do
        {
            get {return _do;}
            set {_do=value;}
        }
        #endregion
    }
    #endregion
}