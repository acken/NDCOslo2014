using System;
using Demo.Core.Greeters;
using Nancy;

namespace Demo.Modules
{
    public class Greeter : NancyModule
    {
        public Greeter()
        {
            Get["/{nationality}/{name}"] = parameters => {
                var greeter =  new GreeterFactory().Get(parameters.nationality);
                if (greeter == null) {
                        return Response.AsJson(new { greeting = "nationality not supported" });
                }
                return Response.AsJson(new { greeting = greeter.Greet(parameters.name) });
            };
        }
    }
}
