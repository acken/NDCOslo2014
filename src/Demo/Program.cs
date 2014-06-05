using System;
using Nancy;
using Nancy.Hosting.Self;

namespace Demo
{
	class Program
	{
		static void Main(string[] args)
		{
            using (var host = new NancyHost(new Uri("http://localhost:1234")))
            {
                host.Start();
                Console.WriteLine("Server started on http://localhost:1234");
                Console.ReadLine();
            }
		}
	}
}
