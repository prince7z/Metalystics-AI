import { atom, atomFamily, selector, selectorFamily } from 'recoil';
const BASE_URL =  'http://localhost:5000';

const defaMD = {
        id: "1234",
        stage: {
            init: 1,
            inve: {
                extraction: 1,
                Tport_to_refinary: 1,
                refining: 1,
                smelting: 1,
                Tport_to_factory: 1,
                manufacturing: 1,
                Tport_to_consumer: 1,
                usage_phase: 1,
                Recycle: 1,
                end_of_life: 1
            },
            results: 1
        }
    };

export const meta_data = selectorFamily({
  key: "meta_data",
  get: (id:string) => async () => {
    try{
      const response = await fetch(`${BASE_URL}/api/project/metadata/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return defaMD;
    }
  },
});