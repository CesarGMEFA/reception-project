import { notifySucess, notifyError } from '../utils/notify';
import { supabase } from '../utils/supabaseClient'

async function  updateColor(d, data, phones, setValue, render, setRender) {
  const arrayData = Array([...phones.color], d.newColor);
		console.log("arrayData: ", arrayData);
		try {
			const { data: send, error } = await supabase
				.from("molds")
				.update({ color: [...phones.color, d.newColor] })
				.eq("brand", phones.brand);
			
      if (error) {
        notifyError()
        throw error
      };

      notifySucess()
      
      if (send) {
        data.forEach( obj => {
          if (obj.brand === phones.brand) {
            obj.color.push(d.newColor)
          }
        })
        setRender(!render)
      }
		} catch (e) {
			console.log("ERROR: ", e);
		} finally {
			setValue("newColor", "");
		}
}

export { updateColor }