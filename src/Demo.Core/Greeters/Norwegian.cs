using System;

namespace Demo.Core.Greeters
{
    public class Norwegian : IGreeter
    {
        public bool Greets(string nationality) {
            return nationality == "no";
        }
        public string Greet(string name) {
            return "Hei "+name;
        }
    }
}
