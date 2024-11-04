using Optic.Application.Domain.Entities;
using SNET.Framework.Domain.Autentications.Jwt;

namespace Optic.Domain.Autentications
{
    public interface IManagerToken
    {
        public TokenModel GenerateToken(User user);
    }
}
