export const body = `
<p>
    Input your user credentials to log into your account.
</p>

<form id="login">
    <div class="form-group">
        <label for="username">Username</label>
        <input id="username"
                name="username"
                class="form-control"
                type="text" />
    </div>

    <div class="form-group">
        <label for="password">Password</label>
        <input id="password"
                name="password"
                class="form-control"
                type="password" />
    </div>
<form>`;

export const alert = `
<div class="alert alert-danger" role="alert">
    Your login credentials are invalid.<br />
    Try again or use the "Forgot my password" page.
</div>`;