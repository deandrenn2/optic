using Optic.Domain.Shared;

public abstract class PagedResultBase : Result
{
    protected internal PagedResultBase(bool isSuccess, string? message) : base(isSuccess, message)
    {
    }

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
public class PagedResult<T> : PagedResultBase where T : class
{
    public IList<T> Results { get; set; }

    public PagedResult(bool isSuccess, string? message)
        : base(isSuccess, message)
    {
        Results = new List<T>();
    }
}