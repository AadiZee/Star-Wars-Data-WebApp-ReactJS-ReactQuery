import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (queryKey, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { status, data } = useQuery(["planets", page], ({ queryKey }) =>
    fetchPlanets(queryKey, page)
  );

  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && <div>Loading data</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <>
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
          <button
            onClick={() =>
              setPage((old) => (!data || !data.previous ? old : old - 1))
            }
            disabled={page === 1}
          >
            Previous Page
          </button>
          <button
            onClick={() => {
              setPage((old) => (!data || !data.next ? old : old + 1));
            }}
            disabled={!data.next}
          >
            Next Page
          </button>
        </>
      )}
    </div>
  );
};

export default Planets;
