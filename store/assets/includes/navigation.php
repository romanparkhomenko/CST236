
<nav class="navbar navbar-expand-sm navbar-light">
    <a class="navbar-brand" href="/store">
        <img id="nav-logo" src="/store/assets/images/acme-logo-dark.svg" alt="acme-logo">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
            <a class="nav-item nav-link" href="/store">Home <span class="sr-only">(current)</span></a>
            <!-- Change Nav link based on if logged in or not. -->
            <?php
                if(isset( $_SESSION["username"]) ) {
                    echo '<a class="nav-item btn btn-danger" href="/store/index.php?logout=1">Logout</a>';
                } else { ?>
                    <a class="nav-item nav-link" href="/store/register.php">Register</a>
                    <a class="nav-item nav-link" href="/store/login.php">Login</a>
                    <?php
                }
            ?>
        </div>
    </div>
</nav>
