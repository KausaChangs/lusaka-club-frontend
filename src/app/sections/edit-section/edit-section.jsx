import Axios from "axios";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppStateContext } from "../../components/appContext";

export default function EditSection() {
  const appState = useContext(AppStateContext);

  const [error, setError] = useState(false);

  const [section, setSection] = useState({
    id: appState.itemToEdit.id,
    name: appState.itemToEdit.name,
    description: appState.itemToEdit.description,
  });

  function handle(e) {
    const newSection = { ...section };
    newSection[e.target.id] = e.target.value;
    setSection(newSection);

    console.log(newSection, "newSection");
  }

  const url = "http://localhost:3000/sections" + "/" + section.id;

  const navigateTo = useNavigate();

  const handleClick = () => {};

  function submit(e) {
    e.preventDefault();

    if (section.name.length <= 0) {
      setError(true);
      return;
    }
    if (section.description.length <= 0) {
      setError(true);
      return;
    }

    Axios.put(url, {
      name: section.name,
      description: section.description,
    }).then((res) => {
      console.log(res.section);
    });

    navigateTo("/sections");
  }

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={(e) => submit(e)}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Edit Section
            </h1>
            {/* <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what you
                share.
              </p> */}
            {error ? (
              <Alert
                heading="Opps"
                message="Something went wrong, Kindly retry"
              />
            ) : (
              ""
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Section Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="username"
                  id="name"
                  onChange={(e) => handle(e)}
                  value={section.name}
                  autoComplete="username"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-l-md rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="about"
                  onChange={(e) => handle(e)}
                  value={section.description}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={""}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about the Section.
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700"
              >
                Cover photo
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </>
        </div>
      </div>
    </form>
  );
}
