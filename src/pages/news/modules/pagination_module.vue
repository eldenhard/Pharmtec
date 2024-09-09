<template>
<div>
<!--Pagination 4-->
<nav class="Pager4" aria-label="pagination example">
    <ul class="pagination pagination-circle justify-content-center">

        <!--Arrow left-->
        <li class="page-item disabled">
            <a class="page-link prev" aria-label="Previous">
                <span aria-hidden="true"><i class="bi bi-chevron-compact-left"></i></span>
            </a>
        </li>

        <!--Numbers-->
        <li class="page-item active"><a class="page-link">1</a></li>
        <li class="page-item"><a class="page-link">2</a></li>
        <li class="page-item"><a class="page-link">3</a></li>
        <li class="page-item"><a class="page-link">4</a></li>
        <li class="page-item"><a class="page-link">5</a></li>
        <li>...</li>
        <li class="page-item"><a class="page-link">30</a></li>
        <!--Arrow right-->
        <li class="page-item">
            <a class="page-link next" aria-label="Next">
                <span aria-hidden="true"><i class="bi bi-chevron-compact-right"></i></span>
            </a>
        </li>
    </ul>
</nav>  
    <br><br>
</div>
</template>



<style scoped>
@import '../styles/news_styles.scss';
</style>