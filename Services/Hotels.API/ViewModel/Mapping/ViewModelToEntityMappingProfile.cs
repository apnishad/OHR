using Hotels.API.Models;
using Hotels.API.ViewModel;
using Hotels.API.ViewModel.Converter;
using AutoMapper;

namespace UserIdentity.API.ViewModels.Mappings
{
    public class ViewModelToEntityMappingProfile:Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<byte[], string>().ConvertUsing<ByteArrayToStringTypeConverter>();
            CreateMap<string, byte[]>().ConvertUsing<StringToByteArrayTypeConverter>();
            CreateMap<ImageViewModel,Images>();
            CreateMap<Images,ImageViewModel>();
            CreateMap<Rooms,RoomsViewModel>();
            CreateMap<RoomsViewModel,Rooms>();
        }
    }
}