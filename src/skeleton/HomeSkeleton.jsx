const HomeSkeleton = () => {
  return (
    <div>

      <section className="bg-yellow-300 text-center py-12 animate-pulse">
        <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
      </section>

      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border rounded-lg p-4 shadow animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded mb-4">
                <svg
                  className="w-12 h-12 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7l9 9m0 0l9-9M12 16V4"
                  />
                </svg>
              </div>


              <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>

              <div className="mt-4 h-8 bg-gray-400 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeSkeleton;
