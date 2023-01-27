import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import Image from "next/future/image";
import logo from "@/public/logo.png";
import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  BellIcon,
  BriefcaseIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CogIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import Editor from "./Editor";

import { authApi } from "@/api/index";

import { Combobox } from "@headlessui/react";

const navigation = [
  { name: "NextJS", href: "/", icon: HomeIcon, current: false },
  { name: "Tailwind", href: "/tailwind", icon: BriefcaseIcon, current: false },
  {
    name: "VS Code",
    href: "#",
    icon: DocumentMagnifyingGlassIcon,
    current: false,
  },
  {
    name: "Messages",
    href: "#",
    icon: ChatBubbleOvalLeftEllipsisIcon,
    current: false,
  },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: false },
];
const secondaryNavigation = [
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon, click: false },
  { name: "Logout", href: "#", icon: ArrowLeftOnRectangleIcon, click: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function createMarkup(c) {
  return { __html: c };
}

export default function Example() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const [tabs, setTabs] = useState([
    { name: "Css", category: "css", href: "#", current: true },
    { name: "Password", category: "password", href: "#", current: false },
    {
      name: "Notifications",
      category: "notifications",
      href: "#",
      current: false,
    },
    { name: "Plan", category: "plan", href: "#", current: false },
    { name: "Billing", category: "billing", href: "#", current: false },
    { name: "Team", category: "team", href: "#", current: false },
  ]);

  const handleChange = (event) => {
    setTabSelect(event.target.value);
    handleGetProfileClick(event.target.value);
    setTabs(
      tabs.map((p) =>
        p.category === event.target.value
          ? { ...p, current: true }
          : { ...p, current: false }
      )
    );
  };

  const [tabSelect, setTabSelect] = useState("css");

  const [selectedPerson, setSelectedPerson] = useState();

  const [people, setPeople] = useState([]);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [des, setDes] = useState();

  useEffect(() => {
    handleGetProfileClick(tabSelect);
  }, []);

  useEffect(() => {
    title.value = selectedPerson == null ? "" : selectedPerson.name;
    link.value = selectedPerson == null ? "" : selectedPerson.link;
    note.value = selectedPerson == null ? "" : selectedPerson.note;
    setDes(selectedPerson == null ? "" : selectedPerson.content);
  }, [selectedPerson]);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);

  async function handleGetProfileClick(tabSelect) {
    try {
      const data = await authApi.getProfile(tabSelect);
      handleResetClick();
      //console.log(data); // Thấy data
      setPeople(data);
      //console.log(people); // Không thấy data
    } catch (error) {
      router.push("/login");
      console.log("failed to login", error);
    }
  }

  async function handleAddProductClick() {
    try {
      await authApi.addProduct({
        name: title.value,
        category: tabSelect,
        content: des,
        link: link.value,
        note: note.value,
      });
      handleResetClick();
      handleGetProfileClick(tabSelect);
    } catch (error) {
      console.log("failed to login", error);
    }
  }

  async function handleResetClick() {
    title.value = "";
    link.value = "";
    note.value = "";
    setDes("");
    search.value = "";
  }

  async function handleUpdateClick() {
    try {
      await authApi.editProduct(
        {
          name: title.value,
          category: tabName.value,
          content: des,
          link: link.value,
          note: note.value,
        },
        selectedPerson.id
      );
      handleResetClick();
      handleGetProfileClick(tabSelect);
    } catch (error) {
      console.log("failed to login", error);
    }
  }

  async function handleDeleteClick() {
    try {
      await authApi.deleteProduct(selectedPerson.id);
      handleResetClick();
      handleGetProfileClick(tabSelect);
    } catch (error) {
      console.log("failed to login", error);
    }
  }

  async function handleLogoutClick() {
    try {
      await authApi.logout();
      router.push("/login");
      console.log("redirect to login page");
    } catch (error) {
      console.log("failed to logout", error);
    }
  }

  const clickLogout = (event) => {
    event.preventDefault();
    handleLogoutClick();
  };

  return (
    <>
      {/*
          This example requires updating your template:
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-14 p-1">
                      <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center rounded-full focus:bg-gray-600 focus:outline-none"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <Image
                      src={logo}
                      alt="XYLOO TECH"
                      width={199}
                      height={39}
                      unoptimized
                      priority
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="flex h-full flex-col">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "border-purple-600 bg-purple-50 text-purple-600"
                                : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center border-l-4 py-2 px-3 text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-purple-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-4 h-6 w-6 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-auto space-y-1 pt-10">
                        {secondaryNavigation.map((item) => (
                          <a
                            onClick={item.click ? clickLogout : ""}
                            key={item.name}
                            href={item.href}
                            className="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <nav className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Image
                src={logo}
                alt="XYLOO TECH"
                width={199}
                height={39}
                unoptimized
                priority
              />
            </div>
            <div className="mt-5 flex-grow">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "border-purple-600 bg-purple-50 text-purple-600"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center border-l-4 py-2 px-3 text-sm font-medium"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-purple-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="block w-full flex-shrink-0">
              {secondaryNavigation.map((item) => (
                <a
                  onClick={item.click ? clickLogout : ""}
                  key={item.name}
                  href={item.href}
                  className="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon
                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Content area */}
        <div className="md:pl-64">
          <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
            <div className="sticky top-0 z-10 flex h-16 flex-shrink-0  bg-white">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex flex-1 justify-between pt-4 px-4 md:px-0 ">
                <Combobox
                  as="div"
                  value={selectedPerson}
                  onChange={setSelectedPerson}
                  className="w-full"
                >
                  <div className="relative mt-1">
                    <Combobox.Input
                      className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      onChange={(event) => setQuery(event.target.value)}
                      displayValue={(person) => person?.name}
                      placeholder="Search..."
                      id="search"
                      name="search"
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    {filteredPeople.length > 0 && (
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPeople.map((person) => (
                          <Combobox.Option
                            key={person.id}
                            value={person}
                            className={({ active }) =>
                              classNames(
                                "relative cursor-default select-none py-2 pl-8 pr-4",
                                active
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-900"
                              )
                            }
                          >
                            {({ active, selected }) => (
                              <>
                                <span
                                  className={classNames(
                                    "block truncate",
                                    selected && "font-semibold"
                                  )}
                                >
                                  {person.name}
                                </span>

                                {selected && (
                                  <span
                                    className={classNames(
                                      "absolute inset-y-0 left-0 flex items-center pl-1.5",
                                      active ? "text-white" : "text-indigo-600"
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    )}
                  </div>
                </Combobox>
              </div>
            </div>

            <main className="flex-1">
              <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
                <div className="pt-0 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-0">
                      <div className="lg:hidden mt-5">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          onChange={handleChange}
                          id="selected-tab"
                          name="selected-tab"
                          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                          defaultValue={
                            tabs.find((tab) => tab.current).category
                          }
                        >
                          {tabs.map((tab) => (
                            <option value={tab.category} key={tab.category}>
                              {tab.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="hidden lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                              <a
                                onClick={() => {
                                  setTabSelect(tab.category);
                                  handleGetProfileClick(tab.category);
                                  setTabs(
                                    tabs.map((p) =>
                                      p.category === tab.category
                                        ? { ...p, current: true }
                                        : { ...p, current: false }
                                    )
                                  );
                                }}
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                  tab.current
                                    ? "border-purple-500 text-purple-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {/* Description list with inline editing */}
                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Tailwind
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-500"></p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Category
                              </dt>

                              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                <select
                                  id="tabName"
                                  name="tabName"
                                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                                  defaultValue={
                                    tabs.find((tab) => tab.current).category
                                  }
                                >
                                  {tabs.map((tab) => (
                                    <option
                                      selected={tab.current ? "selected" : ""}
                                      key={tab.category}
                                      value={tab.category}
                                    >
                                      {tab.name}
                                    </option>
                                  ))}
                                </select>
                              </dd>
                            </div>

                            <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Title
                              </dt>

                              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  autoComplete="title"
                                  className="block w-full max-w-1xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </dd>
                            </div>

                            <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5 sm:pt-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Description
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                <Editor
                                  name="description"
                                  value={des}
                                  onChange={(des) => {
                                    setDes(des);
                                  }}
                                  editorLoaded={editorLoaded}
                                />
                              </dd>
                            </div>
                            {/*
                            <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5 sm:pt-5">
                              <div
                                dangerouslySetInnerHTML={createMarkup(
                                  JSON.stringify(des)
                                )}
                              ></div>
                            </div>
                            */}
                            <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Link
                              </dt>

                              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                <input
                                  type="text"
                                  name="link"
                                  id="link"
                                  autoComplete="link"
                                  className="block w-full max-w-1xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Note
                              </dt>

                              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                <input
                                  type="text"
                                  name="note"
                                  id="note"
                                  autoComplete="note"
                                  className="block w-full max-w-1xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                              <div className="flex justify-end col-span-3">
                                <button
                                  type="submit"
                                  onClick={handleAddProductClick}
                                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                >
                                  New
                                </button>

                                <button
                                  type="submit"
                                  onClick={handleUpdateClick}
                                  className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                >
                                  Update
                                </button>

                                <button
                                  type="submit"
                                  onClick={handleDeleteClick}
                                  className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                >
                                  Delete
                                </button>

                                <button
                                  type="submit"
                                  onClick={handleResetClick}
                                  className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                >
                                  Reset
                                </button>
                              </div>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
