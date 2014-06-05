using System;

namespace Demo.Core.Greeters
{
    public class Swedish : IGreeter
    {
        public bool Greets(string nationality) {
            return nationality == "se";
        }
        public string Greet(string name) {
            return "Hej "+name;
        }
    }
}
