using System;

namespace Demo.Core.Greeters
{
    public interface IGreeter
    {
        bool Greets(string nationality);
        string Greet(string name);
    }
}
