using System.Text;
using AutoMapper;

namespace Hotels.API.ViewModel.Converter{
    public class ByteArrayToStringTypeConverter : ITypeConverter<byte[], string>
    {
        public string Convert(byte[] source, string destination, ResolutionContext context)
        {
            Console.WriteLine(source.ToString());
            string s = Encoding.UTF8.GetString(source);
            Console.WriteLine(s);
            return Encoding.UTF8.GetString(source);
        }
    }
}