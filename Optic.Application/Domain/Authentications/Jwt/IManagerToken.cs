using Optic.Application.Domain.Entities;
using SNET.Framework.Domain.Authentications.Jwt;

namespace Optic.Domain.Authentications
{
    public interface IManagerToken
    {
        public TokenModel GenerateToken(User user);
    }
}
