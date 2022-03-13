import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import Person from "./Person";

const fetchPeople = async (queryKey, page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);

  const { status, data } = useQuery(["people", page], ({ queryKey }) =>
    fetchPeople(queryKey, page)
  );

  console.log(data);

  return (
    <div>
      <h2>People</h2>
      {/* <p>{status}</p> */}
      {status === "loading" && <div> Loading Data....</div>}
      {status === "error" && <div> Error Fetching Data</div>}
      {status === "success" && (
        <>
          <div>
            {data.results.map((person) => (
              <Person person={person} key={person.name} />
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

export default People;
