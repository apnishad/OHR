using FluentValidation;

namespace UserIdentity.API.ViewModels.Validations
{
    public class RegistrationViewModelValidator:AbstractValidator<RegistrationViewModel>
    {
        public RegistrationViewModelValidator()
        {
            RuleFor(vm=>vm.EMail).NotEmpty().WithMessage("Email Cannot be Empty");
            RuleFor(vm=>vm.Password).NotEmpty().WithMessage("Password Cannot be Empty");
            RuleFor(vm=>vm.FirstName).NotEmpty().WithMessage("FirstName Cannot be Empty");
            RuleFor(vm=>vm.LastName).NotEmpty().WithMessage("LastName Cannot be Empty");
            RuleFor(vm=>vm.Location).NotEmpty().WithMessage("Location Cannot be Empty");
        }
    }
}