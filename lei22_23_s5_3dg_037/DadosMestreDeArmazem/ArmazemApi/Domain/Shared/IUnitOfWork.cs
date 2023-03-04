using System.Threading.Tasks;

namespace ArmazemApi.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}