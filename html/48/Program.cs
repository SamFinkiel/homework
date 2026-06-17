namespace CSharpAssesment {
    internal class Program {
        static void Main(string[] args) {
            List<Shirt> shirts = new List<Shirt>();
            string[] colors = new string[] { "red", "green", "blue" };
            string[] patterns = new string[] { "stripped", "checked", "plain" };

            for (int i = 0; i < colors.Length; i++) {
                for (int j = 0; j < patterns.Length; j++) {
                    shirts.Add(new Shirt(colors[i], patterns[j]));
                }
            }

            foreach (Shirt shirt in shirts) {
                Console.WriteLine($"{shirt.Color}: {shirt.Pattern}");
            }
        }
    }
}
