$(document).ready(function () {
    function calculateTotal(row) {
        const quantity = parseFloat(row.find('input[name="quantity[]"]').val()) || 0;
        const priceExcl = parseFloat(row.find('input[name="priceExcl[]"]').val()) || 0;
        const vat = parseFloat(row.find('select[name="vat[]"]').val()) || 0;
        const discount = parseFloat(row.find('input[name="discount[]"]').val()) || 0;

        const totalExcl = quantity * priceExcl * (1 - discount / 100);
        row.find('input[name="totalExcl[]"]').val(totalExcl.toFixed(2));

        return {totalExcl, vat};
    }

    function updateTotals() {
        let netTotal = 0;
        let vatTotal = 0;

        $('#productTable tbody tr').each(function () {
            const {totalExcl, vat} = calculateTotal($(this));
            netTotal += totalExcl;
            vatTotal += totalExcl * vat / 100;
        });

        $('#netTotal').val(netTotal.toFixed(2));
        $('#vatTotal').val(vatTotal.toFixed(2));
        $('#grandTotal').val((netTotal + vatTotal).toFixed(2));
    }

    $('#productTable').on('input', 'input, select', function () {
        updateTotals();
    });

    $('#addProductRow').click(function () {
        const newRow = `
        <tr class="product-row">
          <td class="draggable-handle"><span class="btn btn-sm btn-light">☰</span></td>
          <td><input type="text" class="form-control" name="product[]"></td>
          <td><input type="text" class="form-control" name="extraInfo[]"></td>
          <td><input type="number" class="form-control" name="quantity[]" min="0"></td>
          <td>
            <select class="form-select" name="unit[]">
              <option>hours</option>
              <option>days</option>
              <option>months</option>
              <option>weeks</option>
            </select>
          </td>
          <td><input type="number" step="0.01" class="form-control" name="priceExcl[]" min="0"></td>
          <td>
            <select class="form-select" name="vat[]">
              <option value="0">0%</option>
              <option value="25">25%</option>
            </select>
          </td>
          <td><input type="number" step="0.01" class="form-control" name="discount[]" min="0"></td>
          <td><input type="text" class="form-control" name="totalExcl[]" readonly></td>
          <td><button type="button" class="btn btn-danger btn-sm delete-row">×</button></td>
        </tr>`;
        $('#productTable tbody').append(newRow);
    });

    $('#addTextRow').click(function () {
        const newRow = `
        <tr class="text-row">
          <td class="draggable-handle"><span class="btn btn-sm btn-light">☰</span></td>
          <td colspan="8"><input type="text" class="form-control" name="textRow[]"></td>
          <td><button type="button" class="btn btn-danger btn-sm delete-row">×</button></td>
        </tr>`;
        const currentRow = $(this).closest('.product-row');
        if (currentRow.length) {
            currentRow.after(newRow);
        } else {
            $('#productTable tbody').append(newRow);
        }
    });

    $('#productTable').on('click', '.delete-row', function () {
        $(this).closest('tr').remove();
        updateTotals();
    });

    $('#productForm').submit(function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Collect all form data including dynamically added rows
        const formData = $(this).serialize();
        console.log(formData);

        // Here you can send the formData to your server-side script for further processing
        // Example using AJAX:
        // $.post('process_invoice.php', formData, function(response) {
        //   console.log(response);
        // });

        // For demo purposes, show an alert with the serialized form data
        alert('Form submitted! Check the console for serialized form data.');
    });

    $('#productTable tbody').sortable({
        handle: '.draggable-handle',
        placeholder: 'draggable-placeholder',
        update: function (event, ui) {
            updateTotals();
        }
    }).disableSelection();

    updateTotals();
});
