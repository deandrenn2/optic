
namespace Optic.Domain.Shared;

public abstract class PagedResult
{
    protected internal PagedResult(bool isSuccess, string? message)
    {
        IsSuccess = isSuccess;
        Message = message;
    }

    protected internal PagedResult(bool isSuccess, Error? error)
    {
        IsSuccess = isSuccess;
        Error = error;
    }
    public bool IsSuccess { get; }
    public string? Message { get; }

    public bool IsFailure => !IsSuccess;

    public Error? Error { get; }

    public int Count { get; }

    public static Result Success(string message) => new(true, message);

    public static Result Failure(Error error) => new(false, error);

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

public class PagedResult<T> : PagedResult where T : class
{

    public T Data { get; private set; }
    public IList<T> Results { get; set; }

    private PagedResult(T data, bool isSuccess, Error error)
        : base(isSuccess, error)
    {
        Data = data;
        Results = new List<T>();
    }
    private PagedResult(T data, bool isSuccess, string message)
        : base(isSuccess, message)
    {

        Data = data;
        Results = new List<T>();
    }

    public static PagedResult Success(T data, string message) => new PagedResult<T>(data, true, message);

    public static PagedResult Failure(T data, Error error) => new PagedResult<T>(data, false, error);

}