import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let status: number | undefined;
  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    title = error.statusText || title;
    message = error.data?.message ?? message;
  } else if (error instanceof Error) {
    title = error.name;
    message = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-stone-200 p-8 flex flex-col items-center text-center gap-4">
        {status && (
          <span className="text-6xl font-extrabold text-amber-400">{status}</span>
        )}
        <h1 className="text-2xl font-bold text-stone-800">{title}</h1>
        <p className="text-sm text-stone-500">{message}</p>
        <Link
          to="/"
          className="mt-2 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all text-white font-semibold rounded-lg px-6 py-2 text-sm"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
