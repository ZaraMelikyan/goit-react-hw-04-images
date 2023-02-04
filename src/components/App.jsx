import { useState, useEffect} from 'react';
import { Button, ImageGallery, Loader, Searchbar } from 'components/index';
import { getImages } from 'services/ApiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
  
    if (query !== "") {    
      makeNewFetch();
    }

    async function makeNewFetch () {
    try {
      const response = await getImages(query, page);
      const { totalHits, hits } = response;

      if (totalHits === 0) {        
        setStatus('rejected');
        Notify.failure('Sorry, there are no images matching your search request. Please try another request.');
        return;
      }      
      setTotalPage(Math.ceil(totalHits / 12));
      setImages(images => [...images, ...hits]);
      setStatus('resolved');      

    } catch (error) {
      setStatus('rejected');
      console.log(error.message);
    }
    }
  }, [query, page]);

  


    const onSubmit = submitQuery => {
    if (submitQuery.trim() !== '' && submitQuery !== query) {
      setStatus('idle');
      setQuery(submitQuery);      
    }
    if (submitQuery.trim() === '') {
      setStatus('emptyQuery');
      setQuery('');     
      }
      setImages([]);
      setPage(1);
      setTotalPage(1);
  };

  const handleBtnClick = () => {
    setPage(page => page + 1);
  }

 
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



