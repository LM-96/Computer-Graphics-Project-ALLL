/**
 * Returns the HTMLInputElement with the given id.
 * @param {HTMLInputElement} id the id of the input element to be returned
 * @return {HTMLInputElement} the input element with the given id
 */
export function getInputElementById(id: string): HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id)
}