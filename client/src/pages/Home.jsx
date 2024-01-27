import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import EntryItem from '../components/EntryItem';

export default function Home() {
  const [offerEntrys, setOfferEntrys] = useState([]);
  const [saleEntrys, setSaleEntrys] = useState([]);
  const [rentEntrys, setRentEntrys] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerEntrys);
  useEffect(() => {
    const fetchOfferEntrys = async () => {
      try {
        const res = await fetch('/api/entry/get?offer=true&limit=4');
        const data = await res.json();
        setOfferEntrys(data);
        fetchRentEntrys();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentEntrys = async () => {
      try {
        const res = await fetch('/api/entry/get?type=rent&limit=4');
        const data = await res.json();
        setRentEntrys(data);
        fetchSaleEntrys();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleEntrys = async () => {
      try {
        const res = await fetch('/api/entry/get?type=sale&limit=4');
        const data = await res.json();
        setSaleEntrys(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferEntrys();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerEntrys &&
          offerEntrys.length > 0 &&
          offerEntrys.map((entry) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${entry.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={entry._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* entry results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerEntrys && offerEntrys.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerEntrys.map((entry) => (
                <EntryItem entry={entry} key={entry._id} />
              ))}
            </div>
          </div>
        )}
        {rentEntrys && rentEntrys.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentEntrys.map((entry) => (
                <EntryItem entry={entry} key={entry._id} />
              ))}
            </div>
          </div>
        )}
        {saleEntrys && saleEntrys.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleEntrys.map((entry) => (
                <EntryItem entry={entry} key={entry._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}