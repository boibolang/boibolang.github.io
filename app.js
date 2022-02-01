var i = 1;
document.getElementById('data-form').addEventListener('submit', add);

// Add data
function add(e) {
  const name = document.getElementById('input-name').value;
  const phone = document.getElementById('input-phone').value;
  document.getElementById('myTable').innerHTML += `
    <tr id="row-${i}">
      <td>${i}</td>
      <td id="name-${i}">${name}</td>
      <td id="ph-${i}">${phone}</td>
      <td><a data-action="edit" data-id="${i}">Edit</a> | <a data-action="delete" data-id="${i}">Delete</>
      <td><div id="edit-no-${i}"</td>
    </tr>
  `;
  i++;
  document.getElementById('input-name').value = '';
  document.getElementById('input-phone').value = '';
  e.preventDefault();
}

document.getElementById('myTable').addEventListener('click', function (e) {
  // Edit data
  if (e.target.dataset.action === 'edit') {
    // console.log(e.target);
    const id = e.target.dataset.id;
    const currName = document.getElementById(`name-${id}`).textContent;
    const currPhone = document.getElementById(`ph-${id}`).textContent;
    const editForm = document.getElementById(`edit-no-${id}`);
    editForm.innerHTML = `
      <form id="data-form-edit-${id}" onSubmit="return false" class="">
        <div class="row">
          <div class="three columns">
            <label>Your Name</label>
            <input class="u-full-width" type="text" id="input-name-edit-${id}" value="${currName}" required>
          </div>
          <div class="three columns">
            <label>Your Phone</label>
            <input class="u-full-width" type="text" id="input-phone-edit-${id}" value="${currPhone}" required>
          </div>
          <div class="three columns">
            <label>&nbsp;</label>
            <input class="button-primary" type="submit" value="Update" id="btn-update-${id}">
          </div>
        </div>
      </form>
    `;
    document.getElementById(`data-form-edit-${id}`).addEventListener('submit', function (e) {
      const editedName = document.getElementById(`input-name-edit-${id}`).value;
      const editedPhone = document.getElementById(`input-phone-edit-${id}`).value;
      document.getElementById(`name-${id}`).textContent = editedName;
      document.getElementById(`ph-${id}`).textContent = editedPhone;
      document.getElementById(`data-form-edit-${id}`).classList.add('hidden');
      e.preventDefault();
    });
  } else if (e.target.dataset.action === 'delete') {
    // Delete data
    const id = e.target.dataset.id;
    document.getElementById(`row-${id}`).remove();
  }
});