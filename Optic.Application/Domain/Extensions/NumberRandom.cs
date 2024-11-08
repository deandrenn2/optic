using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Optic.Application.Domain.Extensions
{
    public static class NumberRandom
    {
        public static int Random(int minValue, int maxValue) { 
            Random random = new ();

            int numberRandom = random.Next(minValue, maxValue);

            return numberRandom;
        }
    }
}
