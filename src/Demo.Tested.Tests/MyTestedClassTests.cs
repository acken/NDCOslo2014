using System;
using Demo.Tested;
using NUnit.Framework;

namespace Demo.Tested.Tests
{
    [TestFixture]
    public class MyTestedClassTests
    {
        [Test]
        public void Test()
        {
            Assert.That(new MyTestedClass().Hello(), Is.EqualTo("world"));
        }
    }
}
