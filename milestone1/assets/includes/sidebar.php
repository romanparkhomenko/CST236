
<nav id="sidebar">
    <a class="sidebar-brand" href="/milestone1"><img id="nav-logo" src="/milestone1/assets/images/acme-logo-white.svg" alt="acme-logo"></a>

    <div class="sidebar-links">
        <a href="/milestone1">Home</a>
        <!-- Change Nav link based on if logged in or not. -->
        <?php
        if(isset( $_SESSION["username"]) ) {
            echo '<a class="btn btn-danger" href="/milestone1/index.php?logout=1">Logout</a>';
        } else { ?>
            <a class="nav-item nav-link" href="/milestone1/register.php">Register</a>
            <a class="nav-item nav-link" href="/milestone1/login.php">Login</a>
            <?php
        }
        ?>
    </div>
</nav>
