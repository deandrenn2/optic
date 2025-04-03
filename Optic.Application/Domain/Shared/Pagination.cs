using Microsoft.EntityFrameworkCore;

namespace Optic.Domain.Shared;
public class PagedResultQuery<T> : PagedResultBase where T : class
{
    public IList<T> Data { get; set; }

    public PagedResultQuery()
    {
        Data = new List<T>();
    }
}

public static class Pagination
{
    public static async Task<PagedResultQuery<T>> GetPagedAsync<T>(this IQueryable<T> query,
                                    int pageIndex, int pageSize) where T : class
    {
        var result = new PagedResultQuery<T>();

        result.CurrentPage = pageIndex;

        result.PageSize = pageSize;

        result.Count = query.Count();


        var pageCount = (double)result.Count / pageSize;

        result.PageCount = (int)Math.Ceiling(pageCount);

        var skip = (pageIndex - 1) * pageSize;

        result.Data = await query.Skip(skip).Take(pageSize).ToListAsync();

        return result;
    }
}

public abstract class PagedResultBase : MsgResult
{
    public int CurrentPage { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }

    public int FirstRowOnPage
    {
        get { return (CurrentPage - 1) * PageSize + 1; }
    }

    public int LastRowOnPage
    {
        get { return Math.Min(CurrentPage * PageSize, Count); }
    }

}


