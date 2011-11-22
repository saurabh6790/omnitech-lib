cur_frm.cscript.doc_type = function(doc, dt, dn) {
	//console.log(doc);
	//console.log(doc_type);

	$c_obj(make_doclist(dt, dn), 'get', '', function(r, rt) {
		cur_frm.refresh();
		//console.log(arguments);
	});
}

cur_frm.cscript.onload = function(doc, dt, dn) {
	cur_frm.grids[0].grid.tbar_div.style.width = "30%";
	p = cur_frm.grids[0].grid.tbar_tab.children[0].children[0];
	p.removeChild(p.children[0])
	p.removeChild(p.children[0])
}

cur_frm.cscript.refresh = function(doc, dt, dn) {
	//console.log(p)
	cur_frm.frm_head.timestamp_area.hidden = 1;
	cur_frm.frm_head.page_head.buttons.Save.hidden=1;
	cur_frm.page_layout.footer.hidden = 1;
	cur_frm.add_custom_button('Update', function() {
		if(cur_frm.fields_dict['doc_type'].value) {
			$c_obj(make_doclist(dt, dn), 'post', '', function(r, rt) {
				if(r.exc) {
					msgprint(r.exc);
				} else {
					cur_frm.frm_head.status_area.innerHTML = 
					'<span style="padding: 2px; background-color: rgb(0, 170, 17); \
					color: rgb(255, 255, 255); font-weight: bold; margin-left: 0px; \
					font-size: 11px;">Saved</span>'
					console.log(arguments);
				}
			});	
		}
	},1);
	cur_frm.frm_head.page_head.buttons.Update.className = "cupid-green";
	
	cur_frm.add_custom_button('Reload', function() {
		cur_frm.cscript.doc_type(doc, dt, dn);
	}, 1);
	
	cur_frm.add_custom_button('Reset to defaults', function() {
		cur_frm.confirm('This will remove the customizations defined for this form.\n\n' 
		+ 'Are you sure you want to reset to defaults?');
	}, 1);
}

cur_frm.confirm = function(msg) {
	var d = new wn.widgets.Dialog({
		title: 'Reset To Defaults',
		width: 300,
		fields: [
			{
				fieldtype: 'HTML',
				label: 'Please Confirm',
				fieldname: 'msg'				
			},
			{
				fieldtype: 'Button',
				label: 'Proceed',
				fieldname: 'btn_proceed'
			},
			{
				fieldtype: 'Button',
				label: 'Cancel',
				fieldname: 'btn_cancel'
			}
		]
	});
	//d.set_value('msg', msg);
	d.fields_dict.btn_proceed.input.onclick = function() {
		this.set_working();
		$c_obj(make_doclist(dt, dn), 'delete', '', function(r, rt) {
			if(r.exc) {
				msgprint(r.exc);
			} else {
				console.log(arguments);
			}
		});	
		this.done_working();
		cur_frm.confirm_dialog.hide();
	}
	d.fields_dict.btn_cancel.input.onclick = function() {
		cur_frm.confirm.dialog.hide();
	}

	cur_frm.confirm.dialog = d;
}