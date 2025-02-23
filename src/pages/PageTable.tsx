import { useState, useEffect, useMemo } from "react";
import _ from "lodash";

interface ExampleUser {
  id: number;
  name: string;
  email: string;
}

interface InterfaceSortConfig {
  key: null | string;
  direction: boolean | "asc" | "desc";
}

function PageTable() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<InterfaceSortConfig>({
    key: null,
    direction: "asc",
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/v0/example-table")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.data.users);
      });
  }, []);

  const handleSort = (key: string) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return _.orderBy(data, [sortConfig.key], [sortConfig.direction]);
  }, [data, sortConfig]);

  const filteredData = sortedData.filter(
    (item: ExampleUser) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.email.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <label htmlFor="inputFilter" className="form-label d-none">
        Filter
      </label>
      <input
        type="text"
        id="inputFilter"
        className="form-control"
        aria-describedby="inputFilterHelp"
        placeholder="Search by typing here..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div id="inputFilterHelp" className="form-text d-none">
        Type to search or filter
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID{" "}
              {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortConfig.key === "name"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("email")}>
              Email{" "}
              {sortConfig.key === "email"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user: ExampleUser) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PageTable;
