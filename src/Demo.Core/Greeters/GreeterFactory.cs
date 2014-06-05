using System;
using System.Linq;
using System.Collections.Generic;

namespace Demo.Core.Greeters
{
    public class GreeterFactory
    {
        private List<IGreeter> _greeters = new List<IGreeter>();

        public GreeterFactory() {
            _greeters.Add(new Norwegian());
            _greeters.Add(new Swedish());
        }

        public IGreeter Get(string nationality) {
            return _greeters.FirstOrDefault(x => x.Greets(nationality));
        }
    }
}
