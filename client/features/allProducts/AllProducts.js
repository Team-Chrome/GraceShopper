import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { fetchAllProducts } from "./allProductsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { USD, useWindowSize } from "/client/utils";

//adding touchstart listener will cause the hover effect for mobile devices
//document.addEventListener("touchstart", function() {}, true);

const AllProducts = (props) => {

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const windowSize = useWindowSize();

  let pageRefs = []
  for (let i=0; i<100; i++) {
    const pageRef = useRef()
    pageRefs.push(pageRef)
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const { items, searchKey } = useSelector((state) => state.allProducts);
 
  const [doneFetching, setDoneFetching] = useState(false)
  const [numFilteredItems, setNumFilteredItems] = useState(0)
  const [filteredItems, setFilteredItems] = useState([])
  const [jsxOutput, setJsxOutput] = useState([]);
  const [pageOutput, setPageOutput] = useState([])

  const [itemsExist, setItemsExist] = useState(false)
  const [pageNum, setPageNum] = useState(-1)
  const [prevNumPages,setPrevNumPages] = useState(-1)
  const [numPages, setNumPages] = useState(0)
  const [zeroPage,setZeroPage] = useState(false)
  const [pageRatio,setPageRatio] = useState(0)

  useEffect( ()=>{
    //at some point we may have to detect when there is an update to products db
    //with another redux state
    if (!doneFetching &&items.length > 0) {
      console.log('items finally')
      setDoneFetching(true)
      setPageNum(0)
      setZeroPage(true)
    }
  },[items])

  const filteredItemsRef = useRef()
  const numPagesRef = useRef()
  const itemsPerPageRef = useRef(0)

  useEffect( ()=>{

    let filteredItems = items.filter( 
      item=>item.roaster.toLowerCase().includes(searchKey.toLowerCase())
      || item.name.toLowerCase().includes(searchKey.toLowerCase())
      || item.description.toLowerCase().includes(searchKey.toLowerCase())
    )

    //console.log('filtered items',filteredItems.length,searchKey)
    if ( filteredItems.length === 0) {
      console.log('nothing to display')
      setNumPages(0)
      numPagesRef.current = 0
      setPageOutput([])
    }

    setFilteredItems(filteredItems)
    setNumFilteredItems(filteredItems.length)

    //we need a reference to pass to the function or else
    //it lags
    filteredItemsRef.current = filteredItems
    setItemsExist(false)
    if (filteredItems.length > 0) {
      setItemsExist(true)
      computePagination()
      setZeroPage(true)
      setPageNum(0)
    }

  },[doneFetching,searchKey])

  function computePagination() {

    if (numPages > 0) setPrevNumPages(numPages)

    const itemsPerPage = computeItemsPerPage()
    const numItems = filteredItemsRef.current.length
    const numPagesTmp = Math.trunc( numItems / Math.min(numItems,Math.max(0,itemsPerPage)))
    const extraPage = itemsPerPage * numPagesTmp >= numItems ? 0: 1
    const numP = numPagesTmp + extraPage

    numPagesRef.current = numP
    setNumPages(numP)
    numPagesRef.current = numP

    if ( prevNumPages > 0 && numPages > 0) {
      //console.log('page stuff',pageRatio,numP)
      const newPageNum = Math.min(numP,Math.trunc( Math.round(pageRatio * numP * 100)/100))
      setPageNum(newPageNum)
    }

  }

  const changeRoute = (event, item) => {
    Navigate("/products/" + item.id);
  };

  function computeItemsPerPage() {
    const itemWidth = 230
    return Math.max(1,2*Math.trunc(windowSize.width/itemWidth))
  }

  function computePageRange(numItems,pageNum, itemsPerPage) {

    if (numItems <= 0 ) return [0,0]

    const start = pageNum * itemsPerPage
    const end = start + itemsPerPage
  
    if ( start >= numItems ) {
      //set to last page
      //we must have chosen the last page before resizing

      const numPagesTmp = Math.trunc(numItems/itemsPerPage)
      const extraPage = itemsPerPage * numPagesTmp >= numItems ? 0: 1
   
      const newPageNum = numPagesTmp + extraPage - 1
      
      const newStart = newPageNum * itemsPerPage
      const newEnd = newStart + itemsPerPage

      setPageNum( newPageNum )

      return [Math.min(numItems,newStart),Math.min(numItems,newEnd)]
    }

    return [Math.min(start,numItems),Math.min(end,numItems)]
  }

  function handlePageChange(ev,newPageNum) {

    setPageNum(newPageNum);
    //console.log('asdfsadf',numPagesRef.current,newPageNum)
    if (numPagesRef.current > 0) {
      let pr = Math.max(0,Math.min(1,(newPageNum) / numPagesRef.current))

      //we want the endpoints exactly
      if (newPageNum === 0) pr = 0
      if (newPageNum === numPagesRef.current-1) pr = 1
      setPageRatio( pr )
    }
  }

  //console.log('pr',pageRatio)
  //creating the pagination bar
  useEffect(()=>{

    if (itemsExist) {

      let newPageOutput = []

      //console.log('numpages ',numPages)
      for (let i = 0; i < numPages; i++) {
        let classNameString = "pageNum";

        if (zeroPage && i===0) {
          classNameString += " currentPageNum"
          //setZeroPage(false)
        }

        newPageOutput.push(
          <span
            className={classNameString}
            ref={pageRefs[i]}
            onClick={(ev) => {
              handlePageChange(ev,i)
            }}
            key={"pageLink" + i}
          >
            {"\u00A0"} {i + 1}
          </span>
        );
      }

      setPageOutput(newPageOutput);
    }

  },[itemsExist,numPages,searchKey])

  //pageRefs are a little flakey - I am unsure when they are exactly set
  useEffect(()=>{  
    if ( !pageRefs[0].current) return
    for (let i=0; i<numPages; i++) {
      if (pageRefs[i].current) pageRefs[i].current.classList.remove("currentPageNum")
    }
    if (pageRefs[pageNum] && pageRefs[pageNum].current) 
      pageRefs[pageNum].current.classList.add("currentPageNum")
  },[pageNum])

  useEffect(()=>{
    setZeroPage(true)
    itemsPerPageRef.current = computeItemsPerPage()
    if (filteredItemsRef.current.length > 0 )
    {
      computePagination()
    }
  },[windowSize])

  useEffect(() => {
    let newJsxOutput = [];
    if (filteredItems.length > 0) {

      const [itemStart,itemEnd] = computePageRange(filteredItems.length,pageNum,itemsPerPageRef.current)

      for (let i=itemStart; i<itemEnd; i++) {
        const item = filteredItems[i]
        newJsxOutput.push(
          <div
            key={item.name + item.id}
            className="allProducts-item"
            onClick={(event) => {
              changeRoute(event, item);
            }}
          >
            <div className="imgContainer">
              <img src={item.imageUrl} alt={item.roaster + "," + item.name}></img>
            </div>
            <h3 style={{width:"100%",lineHeight:'30px'}} className="outlined">{item.roaster}</h3>
            <h4
              style={{
                lineHeight: "22px",
                background: "linear-gradient(rgb(150,120,80),rgb(200,200,100)",
                fontSize: "1.2em",
                fontWeight: "bold",
              }}
            >
              {item.name}
            </h4>
            <p
              style={{
                color: "black",
                lineHeight: "18px"    
              }}
            >
              {item.description}
            </p>
            <div className="price">${USD(item.price)}</div>
          </div>
        );
      }
    }
    setJsxOutput(newJsxOutput);
  }, [pageNum,filteredItems,numPages]);

  return [
    <div
      key="pagesDiv"
      className="pages"
      style={{
        paddingRight: "10px",
        paddingLeft: "5px",
        position: "relative",
        zIndex: "200",
        backgroundColor: "rgba(20,20,200,.5)",
        display: "inline-block",
        textAlign: "center",
        fontSize: "1.2em",
      }}
    >
      <button
        onClick={(ev) => {
          const current = Math.max(0, pageNum - 1)
          handlePageChange(ev,current)
        }}
        className="pageChange"
      >
        {"\u00A0<\u00A0"}
      </button>
      <span style={{ color: "white" }}>page</span>
      <button
        onClick={(ev) => {
          const current = Math.min(numPagesRef.current - 1, pageNum + 1)
          handlePageChange(ev,current)
        }}
        className="pageChange"
      >
        {"\u00A0>\u00A0"}
      </button>
      {pageOutput}
    </div>,

    <div
      style={{ marginTop: "10px" }}
      id="allProducts"
      key="allProducts"
      className="flexBox01"
    >
      {jsxOutput}
    </div>,
  ];
};

export default AllProducts;
