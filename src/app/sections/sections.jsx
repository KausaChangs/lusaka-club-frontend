import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditSection from "./edit-section/edit-section";
import { SetAppStateContext, AppStateContext } from "../components/appContext";

function Sections() {
  const setAppState = useContext(SetAppStateContext);

  const appState = useContext(AppStateContext);

  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function getAll() {
      const resp = await fetch("http://localhost:3000/sections", {
        method: "GET",
      });

      const data = await resp.json();

      return data;
    }

    async function fetchAll() {
      const resp = await getAll();

      setSections(resp);
    }
    fetchAll();
  }, []);

  console.log(sections);

  const navigate = useNavigate();

  const handleEdit = (section) => {
    setAppState({
      ...appState,
      itemToEdit: section,
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Sections</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the Sections in your account including their name and
            description
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to={"/add-section"}>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Section
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th> */}
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {sections.map((section, sectionIdx) => (
                    <tr
                      key={section.id}
                      className={
                        sectionIdx % 2 === 0 ? undefined : "bg-gray-50"
                      }
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {section.name}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td> */}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {section.description}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={"/edit-section/"}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <button
                            onClick={() => {
                              handleEdit(section);
                            }}
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sections;
