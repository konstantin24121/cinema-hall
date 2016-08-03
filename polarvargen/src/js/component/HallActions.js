export default class HallActions{
	constructor(data){
		this.storage = data;
	}

	addTicket(ticket){
		let id = ticket.row+'-'+ticket.tribune;

		if( id in this.storage.ticket){
			this.storage.ticket[id].push(ticket);
		}else{
			this.storage.ticket[id] = [];
			this.storage.ticket[id].push(ticket);
		}
		++this.storage.totalTickets;
		this.storage.summ += ticket.price;
		this.rerender();
		return this;
	}

	removeTicket(ticket){
		let id = ticket.row+'-'+ticket.tribune;

		this.storage.ticket[id].splice(this.storage.ticket[id].indexOf(ticket.place),1);

		if( this.storage.ticket[id].length === 0){
			delete  this.storage.ticket[id];
		}

		--this.storage.totalTickets;
		this.storage.summ -= ticket.price;
		this.rerender();
		return this;
	}

	validate(){
		if(this.storage.totalTickets >= 5){
			return false;
		}else{
			return true;
		}
	}

	_renderRow(places){
		//Тут у вас будет получение шаблона и заполнение переменными
		let string = '<div class="hall-buy__places-row"><div class="hall-buy__places-row-num">ряд <span class="hall-buy__places-row-value">'+places[0].row+'</span></div>';
		let arr = [];
		for( let key in places){
			arr.push(places[key].place);
		}
		string += '<div class="hall-buy__places-row-num">место <span class="hall-buy__places-row-value">'+arr.join(', ')+'</span></div></div>';
		return string;
	}

	rerender(){
		if(! $.isEmptyObject(this.storage.ticket)){
			$('#hallNoData').addClass('hidden');
			$('#hallData').removeClass('hidden');
		}else{
			$('#hallNoData').removeClass('hidden');
			$('#hallData').addClass('hidden');
		}

		//Todo сделать окончание
		$('#hallCountTickets').html(this.storage.totalTickets+' билетов');
		$('#hallTotalSum').html(this.storage.summ+' р');
		let html = '';
		//А это переделайте на _.template а то на скорую руку лиж бы работало
		for( let ticket in this.storage.ticket){
			html += this._renderRow(this.storage.ticket[ticket])
		}
		$('#hallPlaces').html(html);
		return this;
	}
}