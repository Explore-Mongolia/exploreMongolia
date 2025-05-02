import { algoliasearch } from 'algoliasearch';

 const client = algoliasearch('ER7KTK9CBD', '5a052a167d678c5293ff3a3c31ed5866');

export const processRecords = async () => {
    const datasetRequest = await fetch('https://backend-five-lyart-36.vercel.app/destination');
    const destinations = await datasetRequest.json();

    const formattedDestinations = destinations?.destinations?.map((destination, index) => ({
      ...destination,
      objectID: destination.id || index,  
    }));

    return await client.saveObjects( { indexName: 'destinations_index', objects: formattedDestinations });
  };
  

processRecords()
  .then(() => console.log('Successfully indexed objects!'))
  .catch((err) => console.error("hey", err));