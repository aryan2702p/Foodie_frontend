// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectAllProducts, fetchAllProductsAsync, fetchProductsByFilterAsync, selectTotalItems,selectCategories, fetchCategoriesAsync } from '../ProductListSlice';
// import { ChevronLeftIcon, ChevronRightIcon,StarIcon } from '@heroicons/react/20/solid'
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// import { Fragment } from 'react'
// import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

// import { Link } from 'react-router-dom';
// import { fetchAllProducts } from '../ProductListAPI';
// import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/constants';
// import Pagination from '../../common/Pagination';

// const sortOptions = [

//   { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },

//   { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
//   { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
// ]




// const items = [
//   { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//   { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//   { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
// ]



// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// function ProductList() {
//   // const count = useSelector(selectCount);
//   const dispatch = useDispatch();
//   const [filter, setFilter] = useState({});
//   const [sort, setSort] = useState({});
//   const [page, setPage] = useState(1);
//   const totalItems = useSelector(selectTotalItems);
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const products = useSelector(selectAllProducts)
//   const categories = useSelector(selectCategories)
//   const filters = [

//     {
//       id: 'category',
//       name: 'Category',
//       // change according to database //
//       options: categories
//     },
  
//   ]

//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // ...

  

//   const handleFilters = (category) => {
//     const newFilter = { ...filter };
    
//     // Check if the category is already selected, if so, remove it
//     if (newFilter['category'] && newFilter['category'].includes(category)) {
//       newFilter['category'] = newFilter['category'].filter(cat => cat !== category);
//     } else {
//       // Otherwise, add it to the filter
//       newFilter['category'] = [...(newFilter['category'] || []), category];
//     }
    
//     setFilter(newFilter);
//   };

//   const handleSort = (e, option) => {
//     const sort = { _sort: option.sort, _order: option.order };
//     console.log({ sort });

//     setSort(sort);


//   }
//   const handlePage = (page) => {
//     console.log({ page });
//     setPage(page);
//   };

//   useEffect(() => {
//     const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
//     dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
//   }, [dispatch, filter, sort, page]);
//   useEffect(() => {
//     setPage(1)
//   }, [totalItems, sort]);

//   useEffect(()=>{
//     console.log('useeffect')
//     dispatch(fetchCategoriesAsync());
//   },[])

//   return (
//     <div>

//       <div>
//         <div className="bg-white">
//           <div>

            

//             <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//             <div className="mt-8 mb-8">
//             <MyCarousel handleFilters={handleFilters} filters={categories} selectedCategory={selectedCategory} />
//             </div>
//             <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
//                 <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-0">Items</h1>

//                 <div className="flex items-center">
//                   <Menu as="div" className="relative inline-block text-left">
//                     <div>
//                       <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
//                         Sort
//                         <ChevronDownIcon
//                           className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                           aria-hidden="true"
//                         />
//                       </Menu.Button>
//                     </div>

//                     <Transition
//                       as={Fragment}
//                       enter="transition ease-out duration-100"
//                       enterFrom="transform opacity-0 scale-95"
//                       enterTo="transform opacity-100 scale-100"
//                       leave="transition ease-in duration-75"
//                       leaveFrom="transform opacity-100 scale-100"
//                       leaveTo="transform opacity-0 scale-95"
//                     >
//                       <Menu.Items className=" cursor-pointer absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
//                         <div className="py-1">
//                           {sortOptions.map((option) => (
//                             <Menu.Item key={option.name}>
//                               {({ active }) => (
//                                 <p

//                                   onClick={(e) => handleSort(e, option)}
//                                   className={classNames(
//                                     option.current ? 'font-medium text-gray-900' : 'text-gray-500',
//                                     active ? 'bg-gray-100' : '',
//                                     'block px-4 py-2 text-sm'
//                                   )}
//                                 >
//                                   {option.name}
//                                 </p>
//                               )}
//                             </Menu.Item>
//                           ))}
//                         </div>
//                       </Menu.Items>
//                     </Transition>
//                   </Menu>

//                   <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
//                     <span className="sr-only">View grid</span>
//                     <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
//                   </button>
//                   <button
//                     type="button"
//                     className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
//                     onClick={() => setMobileFiltersOpen(true)}
//                   >
//                     <span className="sr-only">Filters</span>
//                     <FunnelIcon className="h-5 w-5" aria-hidden="true" />
//                   </button>
//                 </div>
//               </div>

//               <section aria-labelledby="products-heading" className="pb-24 pt-6">
//                 <h2 id="products-heading" className="sr-only">
//                   Products
//                 </h2>
                


//                 <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
//                   {/* Filters */}
                  
//                   {/* Product grid */}
//                   <div className="lg:col-span-3" >
//                     {/* // this is product list page // */}
//                     <ProductGrid products={products}></ProductGrid>
//                   </div>
//                 </div>
//               </section>

//               {/* section of the products ends */}

//               <Pagination
//                 page={page}
//                 setPage={setPage}
//                 handlePage={handlePage}
//                 totalItems={totalItems}
//               ></Pagination>

//             </main>
//           </div>
//         </div>




//       </div>
//     </div>
//   );
// }

// export default ProductList;

// function MobileFilter({ mobileFiltersOpen, setMobileFiltersOpen, handleFilter, filters }) {

//   return (<Transition.Root show={mobileFiltersOpen} as={Fragment}>
//     <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
//       <Transition.Child
//         show={mobileFiltersOpen}
//         as={Fragment}
//         enter="transition-opacity ease-linear duration-300"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="transition-opacity ease-linear duration-300"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div className="fixed inset-0 bg-black bg-opacity-25" />
//       </Transition.Child>

//       <div className="fixed inset-0 z-40 flex">
//         <Transition.Child
//           as={Fragment}
//           enter="transition ease-in-out duration-300 transform"
//           enterFrom="translate-x-full"
//           enterTo="translate-x-0"
//           leave="transition ease-in-out duration-300 transform"
//           leaveFrom="translate-x-0"
//           leaveTo="translate-x-full"
//         >
//           <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
//             <div className="flex items-center justify-between px-4">
//               <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//               <button
//                 type="button"
//                 className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
//                 onClick={() => setMobileFiltersOpen(false)}
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//               </button>
//             </div>

//             {/* Filters */}
//             <form className="mt-4 border-t border-gray-200">
//               {/* <h3 className="sr-only">Categories</h3>
//              <ul role="list" className="px-2 py-3 font-medium text-gray-900 flex">
//              {subCategories.map((category) => (
//              <li key={category.name} className="inline-block">
//              <a href={category.href} className="block px-2 py-3">
//              {category.name}
//              </a>
//              </li>
//              ))}
//             </ul> */}

//               {filters.map((section) => (
//                 <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
//                   {({ open }) => (
//                     <>
//                       <h3 className="-mx-2 -my-3 flow-root">
//                         <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
//                           <span className="font-medium text-gray-900">{section.name}</span>
//                           <span className="ml-6 flex items-center">
//                             {open ? (
//                               <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                             ) : (
//                               <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                             )}
//                           </span>
//                         </Disclosure.Button>
//                       </h3>
//                       <Disclosure.Panel className="pt-6">
//                         <div className="space-y-6">
//                           {section.options.map((option, optionIdx) => (
//                             <div key={option.value} className="flex items-center cursor-pointer">
//                               <input
//                                 id={filter-mobile-${section.id}-${optionIdx}}
//                                 name={${section.id}[]}
//                                 defaultValue={option.value}
//                                 type="checkbox"
//                                 defaultChecked={option.checked}
//                                 onChange={(e) => handleFilter(e, section, option)}
//                                 className="cursor-pointer h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                               />
//                               <label
//                                 htmlFor={filter-mobile-${section.id}-${optionIdx}}
//                                 className="ml-3 min-w-0 flex-1 text-gray-500"
//                               >
//                                 {option.label}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       </Disclosure.Panel>
//                     </>
//                   )}
//                 </Disclosure>
//               ))}
//             </form>
//           </Dialog.Panel>
//         </Transition.Child>
//       </div>
//     </Dialog>
//   </Transition.Root>);
// }

// function MyCarousel({ handleFilters, filters }) {
//   return (
//     <Carousel 
//       showThumbs={false} 
//       showStatus={false} 
//       showIndicators={false} 
//       infiniteLoop={true} 
//       centerMode={true}   
//       centerSlidePercentage={33.33} 
//       style={{ width: '80%', height: '500px' }} // Adjust the width and height here
//     >
//       {filters.map((category, index) => (
//         <button 
//           key={index} 
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-2 mx-2 flex items-center justify-center"
//           onClick={() => handleFilters(category.label)}
//           style={{
//             borderRadius: '50%', // Makes the button circular
//             border: 'none', // Removes the border
//             overflow: 'hidden', // Ensures the image doesn't exceed the button's boundaries
//             width: '50px', // Set the desired width
//             height: '50px', // Set the desired height
//           }}
//         >
//           <img 
//             src={category.imageSrc} 
//             alt={category.label} 
//             className="w-full h-full object-cover" 
//             style={{ borderRadius: '50%' }} // Ensure the image inside is also circular
//           />
//         </button>
//       ))}
//     </Carousel>
//   );
// }



// // function Pagination({ page, setPage, handlePage, totalItems }) {

// //   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

// //   return (<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
// //     <div className="flex flex-1 justify-between sm:hidden">
// //       <div
// //        onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
// //         className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
// //       >
// //         Previous
// //       </div>
// //       <div onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
// //         className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
// //       >
// //         Next
// //       </div>
// //     </div>
// //     <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
// //       <div>
// //         <p className="text-sm text-gray-700">
// //           Showing{' '}
// //           <span className="font-medium">
// //             {(page - 1) * ITEMS_PER_PAGE + 1}
// //           </span>{' '}
// //           to{' '}
// //           <span className="font-medium">
// //             {page * ITEMS_PER_PAGE > totalItems
// //               ? totalItems
// //               : page * ITEMS_PER_PAGE}
// //           </span>{' '}
// //           of <span className="font-medium">{totalItems}</span> results
// //         </p>
// //       </div>
// //       <div>
// //         <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
// //           <div onClick={(e) => handlePage(page > 0 ? page - 1 : page)}
// //             className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
// //           >
// //             <span className="sr-only">Previous</span>
// //             <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
// //           </div>
// //           {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
// //           {Array.from({ length: totalPages }).map((el, index) => (
// //               <div
// //                 onClick={(e) => handlePage(index + 1)}
// //                 aria-current="page"
// //                 className={`relative cursor-pointer z-10 inline-flex items-center ${
// //                   index + 1 === page
// //                     ? 'bg-indigo-600 text-white'
// //                     : 'text-gray-400'
// //                 } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
// //               >
// //                 {index + 1}
// //               </div>
// //             ))}

// //           <div onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
// //             className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
// //           >
// //             <span className="sr-only">Next</span>
// //             <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
// //           </div>
// //         </nav>
// //       </div>
// //     </div>
// //   </div>);
// // }
// function ProductGrid({ products }) {
//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
//         <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
//           {products.map((product) => (
//             <Link to={/product-detail/${product.id}} key={product.id}>
//               <div className="group relative border-solid border-2 p-2 border-gray-200">
//                 <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
//                   <img
//                     src={product.thumbnail}
//                     alt={product.title}
//                     className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                   />
//                 </div>
//                 <div className="mt-4 flex justify-between">
//                   <div>
//                     <h3 className="text-sm text-gray-700">
//                       <div href={product.thumbnail}>
//                         <span aria-hidden="true" className="absolute inset-0" />
//                         {product.title}
//                       </div>
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">
//                       <StarIcon className="w-6 h-6 inline"></StarIcon>
//                       <span className=" align-bottom">{product.rating}</span>
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm block font-medium text-gray-900">
//                       ${discountedPrice(product)}
//                     </p>
//                     <p className="text-sm block line-through font-medium text-gray-400">
//                       ${product.price}
//                     </p>
//                   </div>
//                 </div>
//                 {product.deleted && (
//                   <div>
//                     <p className="text-sm text-red-400">product deleted</p>
//                   </div>
//                 )}
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }