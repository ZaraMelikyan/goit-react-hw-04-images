import { useState, useEffect, useRef } from 'react';
import { Button, ImageGallery, Loader, Searchbar } from 'components/index';
import { getImages } from 'services/ApiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState('idle');

  const intervalId = useRef(null);

useEffect(() => {

    async function makeNewFetch () {
    try {
      const response = await getImages(query, page);
      const { totalHits, hits } = response;

      if (totalHits === 0) {
        setTotalPage(1);
        setStatus('rejected');
        Notify.failure('Sorry, there are no images matching your search request. Please try another request.');
        return;
      }

      setTotalPage(Math.ceil(totalHits / 12));
      setImages(hits);
      setStatus('resolved');
      Notify.success(`Hurray! ${totalHits} images found`);

    } catch (error) {
      setStatus('rejected');
      console.log(error.message);
    }
    }
  

async function loadMore () {
    try {
      const response = await  getImages(query, page);
      const newImages = response.hits;
      setImages(images => [...images, ...newImages]);
      setStatus('resolved');
      intervalId.current = setTimeout(() => scroll(), 100);

      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    }
  if (page === 1 && query !== "") {
      setStatus('pending');
      makeNewFetch();
    }
    
    if (page > 1) {
      setStatus('pending');
      loadMore();
    }

    return () => {
      clearInterval(intervalId.current);
    }
  }, [query, page]);

  


    const onSubmit = submitQuery => {
    if (submitQuery.trim() !== '' && submitQuery !== query) {
      setStatus('idle');
      setQuery(submitQuery);
      setPage(1);
      setImages([]);
    }
    if (submitQuery.trim() === '') {
      setStatus('emptyQuery');
      setQuery('');
      setImages([]);
      setPage(1);
    }
  };

  const handleBtnClick = () => {
    setPage(page => page + 1);
  }

  const scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };

    return (
      <>
        <Searchbar onSubmit={onSubmit} isSubmitting={status === 'pending'} />
        {images.length > 0 && <ImageGallery images={images} />}
        {status === 'pending'
          ? (<Loader />)
          : page !== totalPage && (<Button onClick={handleBtnClick} />)}
      </>
    );
  }




  //async componentDidUpdate(_, prevState) {

 //   const { query, page } = this.state;

 //   if (prevState.page !== page && page !== 1) {
//      this.setState({ status: 'pending' });
//      this.loadMore(query, page);
//    }

//    if (prevState.query !== query && query !== "") {
 //     this.setState({ status: 'pending' });
//      this.makeNewFetch(query, page)
//    }
//  }