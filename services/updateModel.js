import { notifySucess, notifyError } from '../utils/notify';
import { supabase } from '../utils/supabaseClient'

async function  updateModel(d, data, phones, setValue, render, setRender) {

		try {
			const { data: send, error } = await supabase
				.from("molds")
				.update({ model: [...phones.model, d.newModel] })
				.eq("brand", phones.brand);
			
      if (error) {
        notifyError()
        throw error
      };
      
      notifySucess()

      if (send) {
        data.forEach( obj => {
          if (obj.brand === phones.brand) {
            obj.model.push(d.newModel)
          }
        })
        setRender(!render)
      }
		} catch (e) {
			console.log("ERROR: ", e);
		} finally {
			setValue("newModel", "");
		}
}

export { updateModel }