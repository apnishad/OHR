using System.Text;
using AutoMapper;

namespace Hotels.API.ViewModel.Converter{
    public class StringToByteArrayTypeConverter : ITypeConverter<string, byte[]>
    {
        public byte[] Convert(string source, byte[] destination, ResolutionContext context)
        {
            return Encoding.UTF8.GetBytes(source);
        }
    }
}