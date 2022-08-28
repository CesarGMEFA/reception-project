const TableTotal = ({ orders, sumTotal, v4 }) => {
  return (
		<table className='table-auto col-span-full'>
			<thead>
				<tr>
					<th>Service</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{orders.map((order) => (
					<tr key={v4()}>
						<td>{order.service}</td>
						<td>{order.price}</td>
					</tr>
				))}
				<tr>
					<td className='border-t border-black'>Total:</td>
					<td className='border-t border-black' id='totalPrice'>
						{sumTotal()}
					</td>
				</tr>
			</tbody>
		</table>
  );
}

export default TableTotal