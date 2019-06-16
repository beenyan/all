using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
namespace Temp
{
    #region Log
    public class Log
    {
        #region Member Variables
        protected string _name;
        protected string _time;
        protected string _do;
        protected string _success;
        protected int _id;
        #endregion
        #region Constructors
        public Log() { }
        public Log(string name, string time, string do, string success)
        {
            this._name=name;
            this._time=time;
            this._do=do;
            this._success=success;
        }
        #endregion
        #region Public Properties
        public virtual string Name
        {
            get {return _name;}
            set {_name=value;}
        }
        public virtual string Time
        {
            get {return _time;}
            set {_time=value;}
        }
        public virtual string Do
        {
            get {return _do;}
            set {_do=value;}
        }
        public virtual string Success
        {
            get {return _success;}
            set {_success=value;}
        }
        public virtual int Id
        {
            get {return _id;}
            set {_id=value;}
        }
        #endregion
    }
    #endregion
}