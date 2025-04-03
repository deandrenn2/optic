namespace Optic.Domain.Shared;
public class MsgResult
{

    public object Objeto { get; set; }

    public bool IsSuccess { get; set; }
    public int Code { get; set; }
    public int Count { get; set; }
    public string Message { get; set; }
    public Exception Error { get; set; }

}