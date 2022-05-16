export async function fetchPeople() {
    const promise = await fetch('/api/v1/persons/');
    return promise;
}

export function updatePerson(person) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(person)
    };
    return fetch(`/api/v1/persons/${person.id}/`, requestOptions).then(response => response.json());
}

export function addPerson(person) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(person)
    };
    return fetch(`/api/v1/persons/`, requestOptions).then(response => response.json());
}

export function removePerson(person) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(person)
    };
    return fetch(`/api/v1/persons/${person.id}/`, requestOptions).then(response => response.json());
}